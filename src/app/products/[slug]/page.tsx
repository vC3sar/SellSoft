import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductClient } from "./ProductClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { variants: true }
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link href="/products" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver al catálogo
      </Link>
      
      <ProductClient product={product} />
    </div>
  );
}
