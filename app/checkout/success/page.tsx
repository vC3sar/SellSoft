import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
      <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">¡Pago aprobado!</h1>
      <p className="text-xl text-zinc-400 mb-10">
        Tu compra se ha completado con éxito. Hemos enviado un recibo a tu correo.
      </p>

      <div className="p-8 rounded-3xl glass mb-10 text-left">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Package className="text-indigo-400" />
          Tus productos están listos
        </h2>
        <p className="text-zinc-300 mb-6">
          Tus licencias o enlaces de descarga ya se encuentran disponibles en tu cuenta. También te los hemos enviado por correo electrónico.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/account"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-colors gap-2 text-sm"
          >
            Ver mis compras
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/"
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-colors text-sm"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
