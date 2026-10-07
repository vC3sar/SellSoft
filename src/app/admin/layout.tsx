"import prisma from \"@/lib/prisma\";\
import Link from \"next/link\";\
import { Plus, Edit2, Trash2, Package } from \"lucide-react\";\
import { formatPrice } from \"@/lib/utils\";\
import { DeleteProductButton } from \"./DeleteProductButton\";\
\
export default async function ProductsPage() {\
  const products = await prisma.product.findMany({\
    include: {\
      variants: true,\
      _count: {\
        select: { orders: true, License: true }\
      }\
    },\
    orderBy: { createdAt: \"desc\" }\
  });\
\
  return (\
    <div className=\"w-full max-w-6xl animate-in fade-in duration-500\">\
      <div className=\"flex justify-between items-end mb-10\">\
        <div>\
          <h1 className=\"text-4xl md:text-5xl font-bold tracking-tight text-white mb-3\">Catálogo</h1>\
          <p className=\"text-lg text-zinc-400 font-medium\">Gestiona todos tus productos, software y licencias.</p>\
        </div>\
        <Link \
          href=\"/admin/products/new\" \
          className=\"bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-2\"\
        >\
          <Plus className=\"w-5 h-5\" />\
          Nuevo Producto\
        </Link>\
      </div>\
\
      <div className=\"bg-zinc-900/50 border border-white/5 rounded-3xl backdrop-blur-2xl overflow-hidden\">\
        <div className=\"overflow-x-auto\">\
          <table className=\"w-full text-left border-collapse\">\
            <thead>\
              <tr className=\"border-b border-white/5 bg-white/[0.02]\">\
                <th className=\"px-6 py-4 text-xs font-black tracking-widest text-zinc-500 uppercase\">Producto</th>\
                <th className=\"px-6 py-4 text-xs font-black tracking-widest text-zinc-500 uppercase\">Precio Base</th>\
                <th className=\"px-6 py-4 text-xs font-black tracking-widest text-zinc-500 uppercase\">Variantes</th>\
                <th className=\"px-6 py-4 text-xs font-black tracking-widest text-zinc-500 uppercase\">V
<truncated 3154 bytes>