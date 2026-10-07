"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";

export function ForcePayButton({ 
  orderId, 
  onForcePay 
}: { 
  orderId: string; 
  onForcePay: (id: string) => Promise<void>; 
}) {
  const [isPending, startTransition] = useTransition();

  const handleForcePay = () => {
    if (!confirm("¿Forzar el pago de esta orden? Esto enviará los productos al cliente.")) return;
    
    startTransition(async () => {
      try {
        await onForcePay(orderId);
        toast.success("Pago forzado exitosamente");
      } catch (e) {
        toast.error("Error al forzar el pago");
      }
    });
  };

  return (
    <button 
      type="button"
      disabled={isPending}
      onClick={handleForcePay}
      className="text-xs px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
    >
      {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />} 
      {isPending ? "Procesando..." : "Forzar Pago"}
    </button>
  );
}