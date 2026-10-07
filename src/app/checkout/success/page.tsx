"import { CheckCircle2, Package, ArrowRight, XCircle } from \"lucide-react\";\
import Link from \"next/link\";\
import { OrderService } from \"@/services/OrderService\";\
import { MercadoPagoService } from \"@/services/MercadoPagoService\";\
import { DeliveryService } from \"@/services/DeliveryService\";\
\
export default async function CheckoutSuccessPage({\
  searchParams,\
}: {\
  searchParams: { [key: string]: string | string[] | undefined };\
}) {\
  const paymentId = searchParams.payment_id as string;\
  const externalReference = searchParams.external_reference as string;\
  const orderId = searchParams.orderId as string || externalReference;\
\
  let isSuccess = false;\
  let message = \"\";\
\
  if (!paymentId || !orderId) {\
    message = \"No se encontraron los datos del pago en la URL.\";\
  } else {\
    try {\
      // 1. Obtener la orden de la base de datos\
      const order = await OrderService.getOrderById(orderId);\
\
      if (!order) {\
        message = \"Orden no encontrada en el sistema.\";\
      } else if (order.status === \"PAID\") {\
        // Ya fue procesada previamente\
        isSuccess = true;\
      } else {\
        // 2. Verificar el pago real en Mercado Pago (No confiar ciegamente en la URL)\
        const paymentInfo = await MercadoPagoService.getPayment(paymentId);\
        \
        const isApproved = paymentInfo.status === \"approved\";\
        const isCorrectAmount = Number(paymentInfo.transaction_amount) === Number(order.totalAmount);\
\
        if (isApproved && isCorrectAmount) {\
          // 3. Marcar como pagada\
          await OrderService.updateOrderStatus(orderId, \"PAID\", paymentId);\
          \
          // 4. Dispensar productos (entregar licencias y enlaces)\
          await DeliveryService.dispense(orderId);\
          \
          isSuccess = true;\
        } else {\
          message = \"El pago no está aprobado o el monto es incorrecto.\";\
          // Opcional: Actualizar a FAILED si corresponde\
          if (paymentInfo.status === \"rejected\" || 
<truncated 2725 bytes>