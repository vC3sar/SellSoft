import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Solo permitir eliminar si la licencia no ha sido vendida (AVAILABLE)
    const license = await prisma.license.findUnique({ where: { id } });
    if (!license) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    if (license.status !== "AVAILABLE") {
      return NextResponse.json({ error: "No se puede eliminar una licencia vendida" }, { status: 400 });
    }

    await prisma.license.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
