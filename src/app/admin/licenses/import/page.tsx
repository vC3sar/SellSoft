"\"use client\";\
\
import { useState, useEffect } from \"react\";\
import { useRouter } from \"next/navigation\";\
import { ArrowLeft, Loader2 } from \"lucide-react\";\
import Link from \"next/link\";\
\
export default function ImportLicensesPage() {\
  const router = useRouter();\
  const [loading, setLoading] = useState(false);\
  const [products, setProducts] = useState<any[]>([]);\
  const [selectedProductId, setSelectedProductId] = useState(\"\");\
  const [licensesText, setLicensesText] = useState(\"\");\
\
  useEffect(() => {\
    fetch(\"/api/products\")\
      .then(r => r.json())\
      .then(data => {\
        const licenseProducts = data.filter((p: any) => p.type === \"LICENSE\");\
        setProducts(licenseProducts);\
        if (licenseProducts.length > 0) setSelectedProductId(licenseProducts[0].id);\
      })\
      .catch(console.error);\
  }, []);\
\
  const handleSubmit = async (e: React.FormEvent) => {\
    e.preventDefault();\
    if (!selectedProductId || !licensesText) return;\
    setLoading(true);\
\
    const keys = licensesText.split(\"\\
\").map(k => k.trim()).filter(k => k.length > 0);\
\
    try {\
      const res = await fetch(\"/api/admin/licenses/import\", {\
        method: \"POST\",\
        headers: { \"Content-Type\": \"application/json\" },\
        body: JSON.stringify({\
          productId: selectedProductId,\
          keys\
        })\
      });\
\
      if (res.ok) {\
        alert(`Se importaron ${keys.length} licencias correctamente.`);\
        router.push(\"/admin\");\
        router.refresh();\
      } else {\
        alert(\"Error al importar licencias\");\
      }\
    } catch (error) {\
      console.error(error);\
    } finally {\
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
      <h1 className=
<truncated 1954 bytes>