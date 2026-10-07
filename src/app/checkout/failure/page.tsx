"import { XCircle, ArrowLeft } from \"lucide-react\";\
import Link from \"next/link\";\
\
export default function CheckoutFailurePage() {\
  return (\
    <div className=\"container mx-auto px-4 py-24 max-w-2xl text-center\">\
      <div className=\"w-24 h-24 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]\">\
        <XCircle className=\"w-12 h-12\" />\
      </div>\
      \
      <h1 className=\"text-4xl font-bold mb-4\">El pago ha sido rechazado</h1>\
      <p className=\"text-xl text-zinc-400 mb-10\">\
        Lo sentimos, no pudimos procesar tu pago.\
      </p>\
\
      <div className=\"p-8 rounded-3xl glass mb-10 text-left\">\
        <p className=\"text-zinc-300 mb-6\">\
          Es posible que tu tarjeta no tenga fondos suficientes, haya expirado, o el banco haya bloqueado la transacción por seguridad.\
        </p>\
        \
        <Link \
          href=\"/cart\"\
          className=\"w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-colors gap-2 text-sm\"\
        >\
          <ArrowLeft className=\"w-4 h-4\" />\
          Volver al carrito e intentar con otro método\
        </Link>\
      </div>\
    </div>\
  );\
}\
"