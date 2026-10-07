"import prisma from \"@/lib/prisma\";\
import Link from \"next/link\";\
import { ArrowLeft, ShieldCheck, ShieldAlert, UserX, UserCheck } from \"lucide-react\";\
\
export default async function AdminUsersPage() {\
  const users = await prisma.user.findMany({\
    orderBy: { createdAt: \"desc\" },\
    include: {\
      _count: {\
        select: { orders: true }\
      }\
    }\
  });\
\
  return (\
    <div className=\"container mx-auto px-4 py-12 max-w-6xl\">\
      <Link href=\"/admin\" className=\"inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors\">\
        <ArrowLeft className=\"w-4 h-4\" />\
        Volver al Panel\
      </Link>\
      \
      <h1 className=\"text-3xl font-bold mb-8\">Gestión de Usuarios</h1>\
      \
      <div className=\"glass rounded-3xl overflow-hidden\">\
        <div className=\"overflow-x-auto\">\
          <table className=\"w-full text-left\">\
            <thead className=\"bg-white/5 border-b border-white/10 text-sm text-zinc-400\">\
              <tr>\
                <th className=\"p-4 font-medium\">Usuario</th>\
                <th className=\"p-4 font-medium\">Rol</th>\
                <th className=\"p-4 font-medium\">Compras</th>\
                <th className=\"p-4 font-medium\">Estado</th>\
                <th className=\"p-4 font-medium\">Acciones</th>\
              </tr>\
            </thead>\
            <tbody className=\"divide-y divide-white/5\">\
              {users.map((u) => (\
                <tr key={u.id} className=\"hover:bg-white/5 transition-colors\">\
                  <td className=\"p-4\">\
                    <p className=\"font-bold\">{u.name || \"Sin nombre\"}</p>\
                    <p className=\"text-xs text-zinc-500\">{u.email}</p>\
                  </td>\
                  <td className=\"p-4\">\
                    <span className={`px-2 py-1 rounded text-xs font-bold ${\
                      u.role === \"ADMIN\" ? \"bg-emerald-500/20 text-emerald-400\" : \"bg-zinc-800 text-zinc-400\"\
                
<truncated 1519 bytes>