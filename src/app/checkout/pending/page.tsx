"import { Loader2, Clock } from \"lucide-react\";\
import Link from \"next/link\";\
\
export default function CheckoutPendingPage() {\
  return (\
    <div className=\"container mx-auto px-4 py-24 max-w-2xl text-center\">\
      <div className=\"w-24 h-24 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]\">\
        <Clock className=\"w-12 h-12\" />\
      </div>\
      \
      <h1 className=\"text-4xl font-bold mb-4\">Estamos confirmando tu pago...</h1>\
      <p className=\"text-xl text-zinc-400 mb-10\">\
        Mercado Pago está procesando tu transacción. No cierres esta ventana.\
      </p>\
\
      <div className=\"p-8 rounded-3xl glass mb-10 flex flex-col items-center\">\
        <Loader2 className=\"w-10 h-10 animate-spin text-indigo-500 mb-4\" />\
        <p className=\"text-zinc-300\">\
          En cuanto el pago sea aprobado, serás redirigido o tus productos aparecerán en tu cuenta.\
        </p>\
      </div>\
\
      <Link \
        href=\"/account\"\
        className=\"text-zinc-500 hover:text-white transition-colors\"\
      >\
        Ir a mi cuenta\
      </Link>\
    </div>\
  );\
}\
"