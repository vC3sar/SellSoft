import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, keys } = body;

    if (!productId || !keys || !Array.isArray(keys)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const licenses = keys.map((key: string) => ({
      productId,
      licenseKey: key,
      status: "AVAILABLE",
    }));

    // In a real app we might want to check for duplicates first or use createMany with skipDuplicates.
    // SQLite doesn't natively support skipDuplicates perfectly in older Prisma, but it works now.
    const result = await prisma.license.createMany({
      data: licenses,
      // skipDuplicates: true, // Optional
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error importing licenses" }, { status: 500 });
  }
}
