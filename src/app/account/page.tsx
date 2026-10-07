"import { User, Package, Key, Download } from \"lucide-react\";\
import prisma from \"@/lib/prisma\";\
\
export default async function AccountPage() {\
  // In a real application, you would get the user from the session\
  // For this demo, we assume user is logged in or we show an empty state.\
  const sessionUserEmail = \"juan@ejemplo.com\"; \
\
  // Fetch orders\
  const orders = await prisma.order.findMany({\
    where: { customerEmail: sessionUserEmail },\
    include: {\
      items: {\
        include: { product: true }\
      },\
      licenses: {\
        include: { product: true }\
      },\
      downloads: true\
    },\
    orderBy: { createdAt: 'desc' }\
  }).catch(() => []);\
\
  return (\
    <div className=\"container mx-auto px-4 py-12 max-w-6xl\">\
      <h1 className=\"text-4xl font-bold mb-10\">Mi Cuenta</h1>\
\
      <div className=\"grid grid-cols-1 md:grid-cols-4 gap-8\">\
        <div className=\"md:col-span-1 space-y-2\">\
          <div className=\"p-6 rounded-2xl glass mb-6 text-center flex flex-col items-center\">\
            <div className=\"w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4\">\
              <User className=\"w-8 h-8 text-zinc-400\" />\
            </div>\
            <p className=\"font-semibold\">{sessionUserEmail}</p>\
          </div>\
\
          <nav className=\"space-y-1\">\
            <a href=\"#compras\" className=\"block px-4 py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-colors\">\
              Mis Compras\
            </a>\
            <a href=\"#licencias\" className=\"block px-4 py-3 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors\">\
              Mis Licencias\
            </a>\
            <a href=\"#descargas\" className=\"block px-4 py-3 rounded-lg text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-colors\">\
              Mis Descargas\
            </a>\
          </nav>\
        </div>\
\
        <div className=\"md:col-span-3 spa
<truncated 5655 bytes>