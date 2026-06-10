import { NextRequest, NextResponse } from 'next/server';
import { saveOrderToD1, DBOrder, DBOrderItem } from '@/lib/db';

export const runtime = 'edge';

// Memory cache for simple edge rate limiting
const ipRequestLog: Record<string, { count: number; windowStart: number }> = {};
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Allow max 5 checkouts per IP per minute

async function sendEmailWithRetry(payload: any, maxRetries = 3): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is missing.');
    return false;
  }

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return true;
      }

      const errText = await res.text();
      console.warn(`Resend API response error (Attempt ${attempt + 1}/${maxRetries}):`, errText);
    } catch (err) {
      console.warn(`HTTP request failure when calling Resend API (Attempt ${attempt + 1}/${maxRetries}):`, err);
    }

    attempt++;
    if (attempt < maxRetries) {
      // Exponential backoff delay
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('CF-Connecting-IP') || req.headers.get('x-real-ip') || 'unknown-ip';
    
    // --- 1. Edge-Side Rate Limiting ---
    const now = Date.now();
    if (!ipRequestLog[ip]) {
      ipRequestLog[ip] = { count: 1, windowStart: now };
    } else {
      const log = ipRequestLog[ip];
      if (now - log.windowStart < RATE_LIMIT_WINDOW_MS) {
        log.count++;
        if (log.count > MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many requests. Please wait a minute before trying again.' },
            { status: 429 }
          );
        }
      } else {
        log.count = 1;
        log.windowStart = now;
      }
    }

    // Parse payload
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      shippingAddress,
      orderNotes,
      items,
      honeypot // spam protection honeypot
    } = body;

    // --- 2. Honeypot Protection ---
    if (honeypot && honeypot.trim() !== '') {
      // Silently ignore or return faux-success to frustrate bot runners
      return NextResponse.json({
        success: true,
        orderNumber: `RC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        message: 'Order received (spam filtered)'
      });
    }

    // --- 3. Robust Input Validation ---
    if (!firstName || firstName.trim() === '') {
      return NextResponse.json({ error: 'First Name is required.' }, { status: 400 });
    }
    if (!lastName || lastName.trim() === '') {
      return NextResponse.json({ error: 'Last Name is required.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!phone || phone.trim().length < 5) {
      return NextResponse.json({ error: 'A valid contact phone number is required.' }, { status: 400 });
    }
    if (!shippingAddress || shippingAddress.trim().length < 10) {
      return NextResponse.json({ error: 'A complete shipping address is required.' }, { status: 400 });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in the cart.' }, { status: 400 });
    }

    // Calculate sum totals
    const totalAmount = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.qty)), 0);
    if (totalAmount <= 0) {
      return NextResponse.json({ error: 'Invalid order total sum.' }, { status: 400 });
    }

    // Generate Order Identity
    const year = new Date().getFullYear();
    const randCode = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
    const orderNumber = `RC-${year}-${randCode}`;
    const orderId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const dbOrder: DBOrder = {
      id: orderId,
      order_number: orderNumber,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      shipping_address: shippingAddress.trim(),
      order_notes: orderNotes ? orderNotes.trim() : '',
      total_amount: totalAmount,
      status: 'Pending',
      created_at: createdAt
    };

    const dbItems: DBOrderItem[] = items.map((itm: any) => ({
      order_id: orderId,
      product_slug: itm.slug || itm.key.split('|')[0],
      product_name: itm.name,
      variant: itm.variant,
      price: Number(itm.price),
      qty: Number(itm.qty)
    }));

    // --- 4. Store Order to D1 SQLite database ---
    await saveOrderToD1(dbOrder, dbItems);

    // --- 5. Format Emails ---
    const adminEmailAddress = process.env.ADMIN_EMAIL || 'yamahaoutboardss@gmail.com';
    const resendFromAddress = process.env.RESEND_FROM || 'onboarding@resend.dev';

    // Format HTML products list
    const productsHtmlList = dbItems.map(itm => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${itm.product_name} (${itm.variant})</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${itm.qty}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${itm.price * itm.qty} USD</td>
      </tr>
    `).join('');

    // Admin Notification Payload
    const adminMailPayload = {
      from: `Reel Cash Orders <${resendFromAddress}>`,
      to: [adminEmailAddress],
      subject: `New Order Received - ${orderNumber}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="background-color: #10b981; color: white; padding: 15px; margin: 0; border-radius: 6px 6px 0 0;">New Order Dispatch Received</h2>
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 6px 6px;">
            <p>A new purchase ticket has been generated successfully and persisted in D1 database.</p>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px; color: #10b981;">Order Details</h3>
            <table style="width: 100%; font-size: 14px; text-align: left;">
              <tr><th style="padding: 4px 0;">Order Number:</th><td><strong>${orderNumber}</strong></td></tr>
              <tr><th style="padding: 4px 0;">Created Date:</th><td>${new Date(createdAt).toLocaleString()}</td></tr>
              <tr><th style="padding: 4px 0;">Order Value:</th><td><span style="color: #10b981; font-weight: bold;">$${totalAmount} USD</span></td></tr>
              <tr><th style="padding: 4px 0;">Status:</th><td><span style="background-color: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">Pending</span></td></tr>
            </table>

            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px; color: #10b981; margin-top: 25px;">Customer Diagnostics</h3>
            <table style="width: 100%; font-size: 14px; text-align: left;">
              <tr><th style="padding: 4px 0; width: 120px;">Name:</th><td>${dbOrder.first_name} ${dbOrder.last_name}</td></tr>
              <tr><th style="padding: 4px 0;">Email Address:</th><td>${dbOrder.email}</td></tr>
              <tr><th style="padding: 4px 0;">Phone:</th><td>${dbOrder.phone}</td></tr>
              <tr><th style="padding: 4px 0; vertical-align: top;">Address:</th><td>${dbOrder.shipping_address.replace(/\n/g, '<br/>')}</td></tr>
              <tr><th style="padding: 4px 0; vertical-align: top;">Order Notes:</th><td>${dbOrder.order_notes ? dbOrder.order_notes : 'N/A'}</td></tr>
            </table>

            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px; color: #10b981; margin-top: 25px;">Cart Items</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background-color: #f3f4f6; font-weight: bold;">
                  <th style="padding: 8px; text-align: left;">Product</th>
                  <th style="padding: 8px; text-align: center; width: 80px;">Qty</th>
                  <th style="padding: 8px; text-align: right; width: 100px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtmlList}
                <tr>
                  <td colspan="2" style="padding: 12px 8px; font-weight: bold; text-align: right;">Total Amount:</td>
                  <td style="padding: 12px 8px; font-weight: bold; text-align: right; color: #10b981; font-size: 16px;">$${totalAmount} USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    };

    // Customer Email Confirmation Payload
    const customerMailPayload = {
      from: `Reel Cash & Currency <${resendFromAddress}>`,
      to: [dbOrder.email],
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="background-color: #10b981; color: white; padding: 15px; margin: 0; border-radius: 6px 6px 0 0;">Thank You for Your Order</h2>
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 6px 6px;">
            <p>Dear ${dbOrder.first_name},</p>
            <p>Thank you for shopping with Reel Cash & Currency. Your order has been placed successfully and is currently under <strong>Pending Review</strong>.</p>
            
            <p>Please note that premium replicas are packaged and dispatched within 24 hours. A representative will contact you shortly if any payment adjustments are needed.</p>

            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px; color: #10b981; margin-top: 20px;">Order Summary</h3>
            <table style="width: 100%; font-size: 14px; text-align: left; margin-bottom: 20px;">
              <tr><th style="padding: 4px 0; width: 120px;">Order Number:</th><td><strong>${orderNumber}</strong></td></tr>
              <tr><th style="padding: 4px 0;">Order Total:</th><td style="font-weight: bold; color: #10b981;">$${totalAmount} USD</td></tr>
              <tr><th style="padding: 4px 0; vertical-align: top;">Shipping To:</th><td>${dbOrder.shipping_address.replace(/\n/g, '<br/>')}</td></tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background-color: #f3f4f6; font-weight: bold;">
                  <th style="padding: 8px; text-align: left;">Product</th>
                  <th style="padding: 8px; text-align: center; width: 80px;">Qty</th>
                  <th style="padding: 8px; text-align: right; width: 100px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtmlList}
              </tbody>
            </table>

            <p style="margin-top: 30px; font-size: 12px; color: #666; border-t: 1px solid #eee; pt-15;">
              If you have any questions or would like to track transit schedules in real-time, please contact our encrypted support chat lines on WhatsApp.
            </p>
          </div>
        </div>
      `
    };

    // --- 6. Send Communications Asynchronously (Failure does NOT block checkout success) ---
    // Start notifications in background, but await or check them to satisfy "Log failure" requirement.
    const adminEmailSuccess = await sendEmailWithRetry(adminMailPayload);
    const customerEmailSuccess = await sendEmailWithRetry(customerMailPayload);

    if (!adminEmailSuccess || !customerEmailSuccess) {
      console.error(
        `Email alert failed for order ${orderNumber}. ` +
        `Admin Success: ${adminEmailSuccess}, Customer Success: ${customerEmailSuccess}`
      );
      // We still return success: true because order is saved in database D1. This aligns with requirement 8 logic.
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId,
      emailAlerts: {
        admin: adminEmailSuccess,
        customer: customerEmailSuccess
      }
    });

  } catch (error: any) {
    console.error('Error during checkout API execution:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during checkout processing: ' + error.message },
      { status: 500 }
    );
  }
}
