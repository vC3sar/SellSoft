"import Link from \"next/link\";\
import prisma from \"@/lib/prisma\";\
import { formatPrice } from \"@/lib/utils\";\
\
export default async function ProductsPage() {\
  const products = await prisma.product.findMany({\
    where: { status: \"ACTIVE\" },\
    include: { variants: true }\
  });\
\
  return (\
    <div className=\"container mx-auto px-4 py-16 max-w-6xl\">\
      <h1 className=\"text-4xl font-bold mb-2\">Catálogo de Productos</h1>\
      <p className=\"text-zinc-400 mb-12\">Explora nuestras licencias y software digital.</p>\
      \
      <div className=\"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8\">\
        {products.map(product => (\
          <Link href={`/products/${product.slug}`} key={product.id} className=\"group\">\
            <div className=\"glass rounded-2xl p-6 transition-all hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]\">\
              <div className=\"aspect-video bg-zinc-900 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center\">\
                {/* Fallback image if no images uploaded */}\
                <span className=\"text-zinc-700 font-bold text-2xl uppercase\">{product.name.substring(0,2)}</span>\
              </div>\
              <h2 className=\"text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors\">{product.name}</h2>\
              <p className=\"text-sm text-zinc-400 mb-4 line-clamp-2\">{product.shortDescription}</p>\
              <div className=\"flex justify-between items-center mt-4\">\
                <span className=\"text-xs font-semibold px-2 py-1 bg-zinc-800 rounded text-zinc-300\">\
                  {product.type === \"LICENSE\" ? \"Licencia\" : \"Software\"}\
                </span>\
                <span className=\"font-bold text-lg text-white\">\
                  {product.variants.length > 0 ? `Desde ${formatPrice(Math.min(...product.variants.map(v => v.price)))}` : formatPrice(product.price)}\
                </span>\
              </div>
<truncated 281 bytes>