import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return handleTestEmail(req);
}

export async function POST(req: NextRequest) {
  return handleTestEmail(req);
}

async function handleTestEmail(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const resendFromAddress = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const adminEmailAddress = process.env.ADMIN_EMAIL || 'yamahaoutboardss@gmail.com';

  const diagnostics = {
    envCheck: {
      hasApiKey: !!apiKey,
      resendFromAddress,
      adminEmailAddress,
    },
    triggerTime: new Date().toISOString(),
  };

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      message: 'RESEND_API_KEY environment variable is missing. Please add it to your project setup / secrets.',
      diagnostics,
    }, { status: 400 });
  }

  const payload = {
    from: `Reel bills Support <${resendFromAddress}>`,
    to: [adminEmailAddress],
    subject: `🚨 Resend Email Delivery Test [Success]`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1e293b; border-radius: 12px; background-color: #0f172a; color: #f1f5f9;">
        <h2 style="color: #22c55e; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-top: 0;">Resend Mail Integration OK</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">Hello!</p>
        <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">This is a premium diagnostic message from your website to verify that the Resend email delivery is properly configured and functional in your Cloud Run container environment.</p>
        
        <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #38bdf8;">Integration Metadata:</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #94a3b8;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 120px;">Sent From:</td>
              <td>${resendFromAddress}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Sent To:</td>
              <td>${adminEmailAddress}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Timestamp:</td>
              <td>${diagnostics.triggerTime}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Status:</td>
              <td style="color: #22c55e; font-weight: bold;">Active Connected</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 13px; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; padding-top: 10px;">
          If you received this message, your email setup is fully operational! Orders and payments verification alerts will also land correctly.
        </p>
      </div>
    `,
  };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const isOk = res.ok;
    const responseText = await res.text();

    if (isOk) {
      return NextResponse.json({
        success: true,
        message: `Test email dispatched successfully to ${adminEmailAddress}! Check your inbox.`,
        apiResponse: responseText ? JSON.parse(responseText) : null,
        diagnostics,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Resend API returned an error response status.',
        statusCode: res.status,
        apiErrorResponse: responseText,
        diagnostics,
      }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: 'Network or server error encountered while sending email request to Resend API.',
      error: err?.message || String(err),
      diagnostics,
    }, { status: 500 });
  }
}
