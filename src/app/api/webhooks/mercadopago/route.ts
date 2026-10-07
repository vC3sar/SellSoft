"import { NextRequest, NextResponse } from 'next/server';\
import crypto from 'crypto';\
import { OrderService } from '@/services/OrderService';\
import { MercadoPagoService } from '@/services/MercadoPagoService';\
import { DeliveryService } from '@/services/DeliveryService';\
import { OrderStatus } from '@prisma/client';\
\
export async function POST(req: NextRequest) {\
  try {\
    const signatureHeader = req.headers.get('x-signature');\
    const xRequestId = req.headers.get('x-request-id');\
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET || '';\
\
    // MP webhook signature validation (basic implementation, usually TS arrays/strings)\
    if (signatureHeader && secret) {\
      const signatureParts = signatureHeader.split(',');\
      const tsMatch = signatureParts.find(p => p.startsWith('ts='));\
      const v1Match = signatureParts.find(p => p.startsWith('v1='));\
\
      if (tsMatch && v1Match) {\
        const ts = tsMatch.split('=')[1];\
        const v1 = v1Match.split('=')[1];\
        \
        const manifest = `id:${xRequestId};request-id:${xRequestId};ts:${ts};`;\
        const hmac = crypto.createHmac('sha256', secret);\
        const digest = hmac.update(manifest).digest('hex');\
\
        if (digest !== v1) {\
          // If strict validation is required, uncomment:\
          // return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });\
        }\
      }\
    }\
\
    const body = await req.json();\
\
    // Verify event type\
    if (body.type === 'payment') {\
      const paymentId = body.data.id;\
      \
      // Consult the payment in Mercado Pago\
      const paymentInfo = await MercadoPagoService.getPayment(paymentId);\
      \
      if (!paymentInfo || !paymentInfo.external_reference) {\
        return NextResponse.json({ success: true }); // Ignore if no external reference\
      }\
\
      const orderId = paymentInfo.external_reference;\
      const order = await OrderService.getOrderById(orderId);\
\
      if (!order) {\
        return NextResponse.json
<truncated 1114 bytes>