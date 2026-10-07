"import prisma from \"@/lib/prisma\";\
import Link from \"next/link\";\
import { ArrowLeft, Package, CheckCircle } from \"lucide-react\";\
import { revalidatePath } from \"next/cache\";\
import { DeliveryService } from \"@/services/DeliveryService\";\
import { AuditService } from \"@/services/AuditService\";\
\
export default async function AdminOrdersPage() {\
  const orders = await prisma.order.findMany({\
    orderBy: { createdAt: \"desc\" },\
    include: {\
      items: { include: { product: true } },\
      user: true\
    }\
  });\
\
  return (\
    <div className=\"container mx-auto px-4 py-12 max-w-7xl\">\
      <Link href=\"/admin\" className=\"inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors\">\
        <ArrowLeft className=\"w-4 h-4\" />\
        Volver al Panel\
      </Link>\
      \
      <h1 className=\"text-3xl font-bold mb-8 flex items-center gap-3\">\
        <Package className=\"text-indigo-400\" />\
        Gestión de Órdenes\
      </h1>\
      \
      <div className=\"glass rounded-3xl overflow-hidden\">\
        <div className=\"overflow-x-auto\">\
          <table className=\"w-full text-left\">\
            <thead className=\"bg-white/5 border-b border-white/10 text-sm text-zinc-400\">\
              <tr>\
                <th className=\"p-4 font-medium\">ID / Fecha</th>\
                <th className=\"p-4 font-medium\">Cliente</th>\
                <th className=\"p-4 font-medium\">Monto</th>\
                <th className=\"p-4 font-medium\">Estado</th>\
                <th className=\"p-4 font-medium\">Acciones</th>\
              </tr>\
            </thead>\
            <tbody className=\"divide-y divide-white/5\">\
              {orders.map((o) => (\
                <tr key={o.id} className=\"hover:bg-white/5 transition-colors\">\
                  <td className=\"p-4\">\
                    <p className=\"font-mono text-xs text-zinc-400\">#{o.id.slice(-8).toUpperCase()}</p>\
                    <p className=\"text-sm\">{new Date(o.createdAt).t
<truncated 2254 bytes>