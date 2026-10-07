"\"use client\";\
\
import { useState } from \"react\";\
import { useRouter } from \"next/navigation\";\
import { ArrowLeft, Loader2 } from \"lucide-react\";\
import Link from \"next/link\";\
\
export default function NewProductPage() {\
  const router = useRouter();\
  const [loading, setLoading] = useState(false);\
  const [formData, setFormData] = useState({\
    name: \"\",\
    slug: \"\",\
    description: \"\",\
    shortDescription: \"\",\
    price: \"\",\
    type: \"LICENSE\",\
  });\
\
  const handleSubmit = async (e: React.FormEvent) => {\
    e.preventDefault();\
    setLoading(true);\
\
    try {\
      const res = await fetch(\"/api/admin/products\", {\
        method: \"POST\",\
        headers: { \"Content-Type\": \"application/json\" },\
        body: JSON.stringify({\
          ...formData,\
          price: parseFloat(formData.price),\
          images: \"[]\",\
          features: \"[]\",\
          status: \"ACTIVE\"\
        })\
      });\
\
      if (res.ok) {\
        router.push(\"/admin\");\
        router.refresh();\
      } else {\
        alert(\"Error al crear producto\");\
        setLoading(false);\
      }\
    } catch (error) {\
      console.error(error);\
      setLoading(false);\
    }\
  };\
\
  return (\
    <div className=\"container mx-auto px-4 py-12 max-w-3xl\">\
      <Link href=\"/admin\" className=\"inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8\">\
        <ArrowLeft className=\"w-4 h-4\" />\
        Volver al Panel\
      </Link>\
\
      <h1 className=\"text-3xl font-bold mb-8\">Nuevo Producto</h1>\
\
      <form onSubmit={handleSubmit} className=\"space-y-6 glass p-8 rounded-2xl\">\
        <div className=\"grid grid-cols-2 gap-6\">\
          <div>\
            <label className=\"block text-sm font-medium text-zinc-400 mb-2\">Nombre</label>\
            <input \
              required\
              type=\"text\" \
              className=\"w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3\" \
              value={formData.name}
<truncated 2952 bytes>