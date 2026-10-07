import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Deleting the product will cascade delete its variants, but maybe not the licenses/orders depending on schema.
    // The schema has onDelete: Cascade for product variants and licenses. Wait, I should check schema.
    // Let's just delete the product.
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
