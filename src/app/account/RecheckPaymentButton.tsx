"\"use client\";\
\
import { useTransition } from \"react\";\
import { toast } from \"sonner\";\
import { RefreshCcw, Loader2 } from \"lucide-react\";\
\
export function RecheckPaymentButton({ \
  orderId, \
  onRecheck \
}: { \
  orderId: string; \
  onRecheck: (id: string) => Promise<{ success: boolean; message: string }>; \
}) {\
  const [isPending, startTransition] = useTransition();\
\
  const handleRecheck = () => {\
    startTransition(async () => {\
      try {\
        const res = await onRecheck(orderId);\
        if (res.success) {\
          toast.success(res.message);\
        } else {\
          toast.info(res.message);\
        }\
      } catch (e) {\
        toast.error(\"Error al verificar el estado de la orden\");\
      }\
    });\
  };\
\
  return (\
    <button \
      type=\"button\"\
      disabled={isPending}\
      onClick={handleRecheck}\
      className=\"text-xs text-zinc-400 hover:text-white px-2 py-1 transition-colors disabled:opacity-50 flex items-center gap-1\"\
      title=\"Verificar pago en Mercado Pago\"\
    >\
      {isPending ? <Loader2 className=\"w-3 h-3 animate-spin\" /> : <RefreshCcw className=\"w-3 h-3\" />}\
      Revisar Pago\
    </button>\
  );\
}"