"use client";

import { useState } from "react";
import { Search, Loader2, Package, Download } from "lucide-react";
import { toast } from "sonner";

export default function FindLicensesPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOrderData(null);

    try {
      const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`);
      
      if (res.ok) {
        const data = await res.json();
        setOrderData(data);
        toast.success("Orden encontrada");
      } else {
        toast.error("No se encontró ninguna orden con esos datos");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl min-h-[80vh] flex flex-col items-center">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Rastrear Compra</h1>
        <p className="text-zinc-400 text-lg">Busca tu orden usando tu correo y el ID de tu compra para obtener tus productos.</p>
      </div>

      <div className="w-full max-w-xl glass p-8 rounded-[2rem] border border-white/5 shadow-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label className="block text-xs font-black tracking-widest text-zinc-500 uppercase mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white transition-all outline-none"
              placeholder="El correo que usaste para comprar"
            />
          </div>
          <div>
            <label className="block text-xs font-black tracking-widest text-zinc-500 uppercase mb-2">ID de la Orden</label>
            <input 
              type="text" 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white transition-all outline-none font-mono"
              placeholder="Ej: cm0x..."
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Buscar mis productos
          </button>
        </form>
      </div>

      {orderData && (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="text-emerald-400" /> 
              Resultados de tu orden
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {orderData.status}
            </span>
          </div>

          {/* Licenses */}
          {orderData.licenses && orderData.licenses.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-300 mb-4">Licencias de Activación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orderData.licenses.map((license: any) => (
                  <div key={license.id} className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 relative">
                    <p className="font-bold mb-4">{license.product.name}</p>
                    <p className="text-xs text-zinc-500 mb-1">CLAVE:</p>
                    <code className="block bg-black p-4 rounded-xl text-emerald-400 font-mono text-sm break-all border border-emerald-500/10 shadow-inner">
                      {license.licenseKey}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Downloads */}
          {orderData.downloads && orderData.downloads.length > 0 && (
            <div className="space-y-4 pt-8">
              <h3 className="text-lg font-semibold text-cyan-300 mb-4">Archivos Descargables</h3>
              <div className="grid grid-cols-1 gap-4">
                {orderData.downloads.map((download: any) => {
                  const isExpired = new Date(download.expiresAt) < new Date();
                  return (
                    <div key={download.id} className="p-6 rounded-2xl glass flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-white/5">
                      <div>
                        <p className="font-bold">Enlace de Descarga Privado</p>
                        <p className="text-sm text-zinc-400">
                          {isExpired ? 'Expirado' : `Válido hasta ${new Date(download.expiresAt).toLocaleDateString()}`}
                        </p>
                      </div>
                      <a 
                        href={`/api/download/${download.token}`}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                          isExpired 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                            : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                        }`}
                        onClick={(e) => isExpired && e.preventDefault()}
                      >
                        <Download className="w-4 h-4" />
                        {isExpired ? 'No disponible' : 'Descargar Archivo'}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {(!orderData.licenses?.length && !orderData.downloads?.length) && (
            <div className="text-center py-12 glass rounded-2xl">
              <p className="text-zinc-500">Esta orden aún no tiene licencias ni descargas generadas.</p>
              <p className="text-sm text-zinc-600 mt-2">Si tu pago fue exitoso, por favor espera unos minutos o contacta a soporte.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
