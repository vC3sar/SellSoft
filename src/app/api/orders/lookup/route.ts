"import { NextRequest, NextResponse } from 'next/server';\
import prisma from '@/lib/prisma';\
\
export async function GET(req: NextRequest) {\
  try {\
    const { searchParams } = new URL(req.url);\
    const email = searchParams.get('email');\
    const orderId = searchParams.get('orderId');\
\
    if (!email || !orderId) {\
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });\
    }\
\
    const order = await prisma.order.findFirst({\
      where: {\
        id: orderId,\
        customerEmail: email,\
      },\
      include: {\
        licenses: {\
          include: {\
            product: true\
          }\
        },\
        downloads: true\
      }\
    });\
\
    if (!order) {\
      return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });\
    }\
\
    // Don't expose sensitive user IDs\
    const safeOrder = {\
      id: order.id,\
      status: order.status,\
      createdAt: order.createdAt,\
      totalAmount: order.totalAmount,\
      licenses: order.licenses,\
      downloads: order.downloads,\
    };\
\
    return NextResponse.json(safeOrder);\
  } catch (error) {\
    console.error('Lookup Error:', error);\
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });\
  }\
}"