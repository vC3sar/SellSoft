"import prisma from \"@/lib/prisma\";\
import Link from \"next/link\";\
import { ArrowLeft, Activity } from \"lucide-react\";\
\
export default async function AdminLogsPage() {\
  const logs = await prisma.auditLog.findMany({\
    orderBy: { createdAt: \"desc\" },\
    take: 100, // Show last 100 logs\
    include: {\
      user: true\
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
      <h1 className=\"text-3xl font-bold mb-8 flex items-center gap-3\">\
        <Activity className=\"text-indigo-400\" />\
        Registro de Auditoría\
      </h1>\
      \
      <div className=\"glass rounded-3xl overflow-hidden p-6\">\
        <div className=\"space-y-4\">\
          {logs.length === 0 && <p className=\"text-zinc-500\">No hay registros recientes.</p>}\
          {logs.map((log) => (\
            <div key={log.id} className=\"p-4 border border-white/5 bg-zinc-950/50 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center\">\
              <div>\
                <div className=\"flex items-center gap-3 mb-1\">\
                  <span className=\"font-bold text-indigo-400 text-sm uppercase tracking-wider\">{log.action}</span>\
                  <span className=\"text-xs text-zinc-500\">{new Date(log.createdAt).toLocaleString(\"es-AR\")}</span>\
                </div>\
                <p className=\"text-zinc-300 text-sm font-mono break-all\">{log.details}</p>\
              </div>\
              <div className=\"text-right shrink-0\">\
                <p className=\"text-sm font-semibold\">{log.user?.email || \"Sistema / Anónimo\"}</p>\
                {log.ipAddress && <p className=\"text-xs text-zinc-500\">IP: {log.ipAddress}</p>}\
              </div>\
            </div>\
          ))}\
        </div>\
      </div>\

<truncated 22 bytes>