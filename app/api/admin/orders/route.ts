import { NextRequest, NextResponse } from 'next/server';
import { fetchOrdersFromD1, updateOrderStatusInD1 } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET orders list (with optional query parameters for search/status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;

    const orders = await fetchOrdersFromD1(search, status);
    
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve orders database logs: ' + error.message },
      { status: 500 }
    );
  }
}

// POST or update order status
export async function POST(req: NextRequest) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order UUID is required.' }, { status: 400 });
    }

    const validStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status option: ${status}` }, { status: 400 });
    }

    await updateOrderStatusInD1(orderId, status);

    return NextResponse.json({ success: true, message: `Order status upgraded to ${status}` });
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to modify order status: ' + error.message },
      { status: 500 }
    );
  }
}
