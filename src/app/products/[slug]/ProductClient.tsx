"\"use client\";\
\
import { useCartStore } from \"@/lib/store\";\
import { formatPrice } from \"@/lib/utils\";\
import { useState } from \"react\";\
import { ShoppingCart, CheckCircle } from \"lucide-react\";\
\
export function ProductClient({ product }: { product: any }) {\
  const [selectedVariant, setSelectedVariant] = useState<any>(\
    product.variants.length > 0 ? product.variants[0] : null\
  );\
  const [quantity, setQuantity] = useState(1);\
  const [added, setAdded] = useState(false);\
  const addItem = useCartStore((s) => s.addItem);\
\
  const price = selectedVariant ? selectedVariant.price : product.price;\
\
  const handleAdd = () => {\
    addItem({\
      productId: product.id,\
      variantId: selectedVariant?.id,\
      name: product.name,\
      variantName: selectedVariant?.name,\
      price: price,\
      quantity: quantity,\
      type: product.type as any,\
    });\
    setAdded(true);\
    setTimeout(() => setAdded(false), 2000);\
  };\
\
  return (\
    <div className=\"flex flex-col md:flex-row gap-12 mt-8\">\
      {/* Visual / Image */}\
      <div className=\"md:w-1/2\">\
        <div className=\"aspect-square bg-zinc-900 rounded-3xl border border-white/5 flex items-center justify-center p-8\">\
          <div className=\"w-full h-full bg-zinc-800 rounded-2xl flex items-center justify-center relative overflow-hidden\">\
             {/* Replace with real images later */}\
             <span className=\"text-4xl font-bold text-zinc-700\">{product.name.charAt(0)}</span>\
          </div>\
        </div>\
      </div>\
\
      {/* Details & Actions */}\
      <div className=\"md:w-1/2 flex flex-col justify-center\">\
        <div className=\"mb-4\">\
          <span className=\"text-indigo-400 font-semibold text-sm uppercase tracking-wider\">{product.type}</span>\
        </div>\
        <h1 className=\"text-4xl font-bold mb-4\">{product.name}</h1>\
        <p className=\"text-zinc-400 text-lg mb-8\">{product.description}</p>\
        \
        <div className=\"text-3xl font-black te
<truncated 2273 bytes>