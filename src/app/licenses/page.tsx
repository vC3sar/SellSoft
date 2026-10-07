"\"use client\";\
\
import { useState } from \"react\";\
import { Key, Search, Loader2, Package, Download } from \"lucide-react\";\
import { toast } from \"sonner\";\
import Link from \"next/link\";\
\
export default function FindLicensesPage() {\
  const [email, setEmail] = useState(\"\");\
  const [orderId, setOrderId] = useState(\"\");\
  const [loading, setLoading] = useState(false);\
  const [orderData, setOrderData] = useState<any>(null);\
\
  const handleSearch = async (e: React.FormEvent) => {\
    e.preventDefault();\
    setLoading(true);\
    setOrderData(null);\
\
    try {\
      const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`);\
      \
      if (res.ok) {\
        const data = await res.json();\
        setOrderData(data);\
        toast.success(\"Orden encontrada\");\
      } else {\
        toast.error(\"No se encontró ninguna orden con esos datos\");\
      }\
    } catch (error) {\
      toast.error(\"Error de conexión\");\
    } finally {\
      setLoading(false);\
    }\
  };\
\
  return (\
    <div className=\"container mx-auto px-4 py-20 max-w-4xl min-h-[80vh] flex flex-col items-center\">\
      <div className=\"text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700\">\
        <div className=\"w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(79,70,229,0.2)]\">\
          <Key className=\"w-8 h-8\" />\
        </div>\
        <h1 className=\"text-4xl md:text-5xl font-bold tracking-tight mb-4\">Mis Licencias</h1>\
        <p className=\"text-zinc-400 text-lg\">Busca tu orden usando tu correo y el ID de tu compra.</p>\
      </div>\
\
      <div className=\"w-full max-w-xl glass p-8 rounded-[2rem] border border-white/5 shadow-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100\">\
        <form onSubmit={handleSearch} className=\"space-y-6\">\
          <div>\
            <label className=\"block text-xs f
<truncated 5618 bytes>