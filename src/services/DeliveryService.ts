import prisma from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { EmailService } from './EmailService';

export class DeliveryService {
  static async dispense(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          }
        }
      }
    });

    if (!order) throw new Error('Order not found');

    for (const item of order.items) {
      if (item.product.type === "LICENSE") {
        await this.dispenseLicense(orderId, item, order.customerEmail);
      } else if (item.product.type === "SOFTWARE") {
        await this.dispenseSoftware(orderId, item, order.customerEmail);
      } else if (item.product.type === "PHYSICAL") {
        await this.dispensePhysical(orderId, item);
      }
    }
  }

  private static async dispensePhysical(orderId: string, item: any) {
    if (item.product.isUnique) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { status: "SOLD_OUT" }
      });
    }
  }

  private static async dispenseLicense(orderId: string, item: any, customerEmail: string) {
    // Need to assign 'quantity' licenses
    for (let i = 0; i < item.quantity; i++) {
      const availableLicense = await prisma.license.findFirst({
        where: {
          productId: item.productId,
          variantId: item.variantId,
          status: "AVAILABLE",
        }
      });

      if (!availableLicense) {
        console.error(`No available licenses for product ${item.productId}`);
        // In a real scenario, we might notify admin or refund.
        continue;
      }

      await prisma.license.update({
        where: { id: availableLicense.id },
        data: {
          status: "SOLD",
          orderId: orderId,
          assignedAt: new Date(),
        }
      });

      await EmailService.sendLicenseEmail(customerEmail, item.product, availableLicense.licenseKey, orderId);
    }
  }

  private static async dispenseSoftware(orderId: string, item: any, customerEmail: string) {
    // Generate a temporary download token
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours

    await prisma.download.create({
      data: {
        orderId: orderId,
        token: token,
        expiresAt: expiresAt,
      }
    });

    const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/download/${token}`;
    await EmailService.sendSoftwareEmail(customerEmail, item.product, downloadLink, orderId);
  }
}
