import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/services/OrderService';
import { MercadoPagoService } from '@/services/MercadoPagoService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, items } = body;

    if (!name || !email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    // Create pending order
    const order = await OrderService.createOrder({
      customerEmail: email,
      customerName: name,
      totalAmount,
      items,
    });

    // Create MercadoPago preference
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const preference = await MercadoPagoService.createPreference(order, items, appUrl);

    // Update order with preference ID
    // (Optional: update order to store the preference ID if needed for frontend checks)

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
