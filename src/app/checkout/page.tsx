"\"use client\";\
\
import { useCartStore } from \"@/lib/store\";\
import { formatPrice } from \"@/lib/utils\";\
import { useState } from \"react\";\
import { ShieldCheck, Loader2 } from \"lucide-react\";\
import { useRouter } from \"next/navigation\";\
\
export default function CheckoutPage() {\
  const { items, total } = useCartStore();\
  const [name, setName] = useState(\"\");\
  const [email, setEmail] = useState(\"\");\
  const [loading, setLoading] = useState(false);\
  const router = useRouter();\
\
  if (items.length === 0) {\
    router.push(\"/cart\");\
    return null;\
  }\
\
  const handleSubmit = async (e: React.FormEvent) => {\
    e.preventDefault();\
    setLoading(true);\
\
    try {\
      const response = await fetch(\"/api/checkout\", {\
        method: \"POST\",\
        headers: {\
          \"Content-Type\": \"application/json\",\
        },\
        body: JSON.stringify({ name, email, items }),\
      });\
\
      const data = await response.json();\
      \
      if (data.init_point) {\
        window.location.href = data.init_point;\
      } else {\
        alert(\"Error procesando el pago\");\
        setLoading(false);\
      }\
    } catch (error) {\
      console.error(error);\
      alert(\"Error en el servidor\");\
      setLoading(false);\
    }\
  };\
\
  return (\
    <div className=\"container mx-auto px-4 py-12 max-w-5xl\">\
      <h1 className=\"text-4xl font-bold mb-10\">Finalizar Compra</h1>\
\
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12\">\
        <div>\
          <div className=\"p-8 rounded-3xl glass\">\
            <h2 className=\"text-2xl font-semibold mb-6 flex items-center gap-2\">\
              <ShieldCheck className=\"text-emerald-400\" />\
              Tus Datos\
            </h2>\
            <form onSubmit={handleSubmit} className=\"space-y-6\">\
              <div>\
                <label className=\"block text-sm font-medium text-zinc-400 mb-2\">Nombre completo</label>\
                <input \
                  type=\"text\" \
         
<truncated 3674 bytes>