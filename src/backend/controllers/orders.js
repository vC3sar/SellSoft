import prisma from '../../lib/prisma'; // Using existing TS Prisma client via tsx
import { MercadoPagoService } from '../../services/MercadoPagoService';
import { DeliveryService } from '../../services/DeliveryService';

export const lookupOrder = async (req, res) => {
  const { email, orderId } = req.query;

  if (!email || !orderId) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  let order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerEmail: email,
    },
    include: {
      licenses: {
        include: { product: true }
      },
      downloads: true
    }
  });

  if (!order) {
    return res.status(404).json({ error: 'Orden no encontrada' });
  }

  if (order.status === "PENDING") {
    const mpPayment = await MercadoPagoService.checkPaymentByOrderId(order.id);
    if (mpPayment && mpPayment.status === "approved") {
      await prisma.order.update({ 
        where: { id: order.id }, 
        data: { status: 'PAID', paymentId: String(mpPayment.id) } 
      });
      await DeliveryService.dispense(order.id);
      
      const updatedOrder = await prisma.order.findFirst({
        where: { id: orderId, customerEmail: email },
        include: {
          licenses: { include: { product: true } },
          downloads: true
        }
      });
      if (updatedOrder) order = updatedOrder;
    }
  }

  const safeOrder = {
    id: order.id,
    status: order.status,
    createdAt: order.createdAt,
    totalAmount: order.totalAmount,
    licenses: order.licenses,
    downloads: order.downloads,
  };

  res.json(safeOrder);
};
