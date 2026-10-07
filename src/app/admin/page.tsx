"import prisma from '@/lib/prisma';\
import { Package, Key, Users, ShoppingBag } from 'lucide-react';\
\
export default async function AdminDashboard() {\
  const totalOrders = await prisma.order.count().catch(() => 0);\
  const totalProducts = await prisma.product.count().catch(() => 0);\
  const totalLicenses = await prisma.license.count().catch(() => 0);\
  const totalIncomeObj = await prisma.order.aggregate({\
    _sum: { totalAmount: true },\
    where: { status: 'PAID' }\
  }).catch(() => ({ _sum: { totalAmount: 0 } }));\
\
  const totalIncome = totalIncomeObj._sum?.totalAmount || 0;\
\
  return (\
    <div className=\"container mx-auto px-4 py-12 max-w-7xl\">\
      <h1 className=\"text-4xl font-bold mb-10\">Panel de Administración</h1>\
\
      <div className=\"grid grid-cols-1 md:grid-cols-4 gap-6 mb-12\">\
        <div className=\"p-6 rounded-2xl glass\">\
          <div className=\"flex items-center gap-4 mb-4\">\
            <div className=\"p-3 bg-indigo-500/10 text-indigo-400 rounded-xl\">\
              <ShoppingBag className=\"w-6 h-6\" />\
            </div>\
            <h3 className=\"font-semibold text-zinc-400\">Órdenes</h3>\
          </div>\
          <p className=\"text-3xl font-bold\">{totalOrders}</p>\
        </div>\
\
        <div className=\"p-6 rounded-2xl glass\">\
          <div className=\"flex items-center gap-4 mb-4\">\
            <div className=\"p-3 bg-emerald-500/10 text-emerald-400 rounded-xl\">\
              <span className=\"font-bold text-xl\">$</span>\
            </div>\
            <h3 className=\"font-semibold text-zinc-400\">Ingresos</h3>\
          </div>\
          <p className=\"text-3xl font-bold\">${totalIncome.toLocaleString('es-AR')}</p>\
        </div>\
\
        <div className=\"p-6 rounded-2xl glass\">\
          <div className=\"flex items-center gap-4 mb-4\">\
            <div className=\"p-3 bg-cyan-500/10 text-cyan-400 rounded-xl\">\
              <Package className=\"w-6 h-6\" />\
            </div>\
            <h3 className=\"font-semibold text-z
<truncated 1222 bytes>