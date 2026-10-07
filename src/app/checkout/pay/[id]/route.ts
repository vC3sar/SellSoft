import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MercadoPagoService } from "@/services/MercadoPagoService";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    });

    if (!order || order.status !== "PENDING") {
      return NextResponse.redirect(new URL("/account", req.url));
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Map items back to the format MercadoPagoService expects
    const mappedItems = order.items.map(item => ({
      productId: item.productId,
      variantId: item.variantId,
      name: item.product.name,
      variantName: item.variant?.name,
      price: item.price,
      quantity: item.quantity,
      type: item.product.type
    }));

    const preference = await MercadoPagoService.createPreference(order, mappedItems, appUrl);

    // Save the new preferenceId to the order
    await prisma.order.update({
      where: { id: order.id },
      data: { preferenceId: preference.id }
    });

    return NextResponse.redirect(preference.init_point);
  } catch (error) {
    console.error("Pay again error:", error);
    return NextResponse.redirect(new URL("/account", req.url));
  }
}
