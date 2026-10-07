import prisma from '@/lib/prisma';

export class OrderService {
  static async createOrder(data: { customerEmail: string; customerName: string; totalAmount: string | number; items: any[]; userId?: string }) {
    return await prisma.order.create({
      data: {
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        totalAmount: Number(data.totalAmount),
        userId: data.userId,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: Number(item.price),
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          }
        }
      }
    });
  }

  static async updateOrderStatus(orderId: string, status: string, paymentId?: string) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status, paymentId },
      include: { items: { include: { product: true } } }
    });
  }

  static async getOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          }
        },
        licenses: true,
        downloads: true,
      }
    });
  }
}
