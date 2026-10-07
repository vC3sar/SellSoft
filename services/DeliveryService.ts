"import prisma from '@/lib/prisma';\
import { ProductType, LicenseStatus } from '@prisma/client';\
import { randomBytes } from 'crypto';\
\
export class DeliveryService {\
  static async dispense(orderId: string) {\
    const order = await prisma.order.findUnique({\
      where: { id: orderId },\
      include: {\
        items: {\
          include: {\
            product: true,\
          }\
        }\
      }\
    });\
\
    if (!order) throw new Error('Order not found');\
\
    for (const item of order.items) {\
      if (item.product.type === ProductType.LICENSE) {\
        await this.dispenseLicense(orderId, item);\
      } else if (item.product.type === ProductType.SOFTWARE) {\
        await this.dispenseSoftware(orderId, item);\
      }\
    }\
  }\
\
  private static async dispenseLicense(orderId: string, item: any) {\
    // Need to assign 'quantity' licenses\
    for (let i = 0; i < item.quantity; i++) {\
      const availableLicense = await prisma.license.findFirst({\
        where: {\
          productId: item.productId,\
          variantId: item.variantId,\
          status: LicenseStatus.AVAILABLE,\
        }\
      });\
\
      if (!availableLicense) {\
        console.error(`No available licenses for product ${item.productId}`);\
        // In a real scenario, we might notify admin or refund.\
        continue;\
      }\
\
      await prisma.license.update({\
        where: { id: availableLicense.id },\
        data: {\
          status: LicenseStatus.SOLD,\
          orderId: orderId,\
          assignedAt: new Date(),\
        }\
      });\
    }\
  }\
\
  private static async dispenseSoftware(orderId: string, item: any) {\
    // Generate a temporary download token\
    const token = randomBytes(32).toString('hex');\
    const expiresAt = new Date();\
    expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours\
\
    await prisma.download.create({\
      data: {\
        orderId: orderId,\
        token: token,\
        expiresAt: expiresAt,\
      }\
    });\
  }\
}\
"