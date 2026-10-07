"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function CancelOrderButton({ 
  orderId, 
  onCancel 
}: { 
  orderId: string; 
  onCancel: (id: string) => Promise<void>; 
}) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (!confirm("¿Seguro que deseas cancelar esta orden?")) return;
    
    startTransition(async () => {
      try {
        await onCancel(orderId);
        toast.success("Orden cancelada exitosamente");
      } catch (e) {
        toast.error("Error al cancelar la orden");
      }
    });
  };

  return (
    <button 
      type="button"
      disabled={isPending}
      onClick={handleCancel}
      className="text-xs text-red-400 hover:text-red-300 px-2 py-1 transition-colors disabled:opacity-50 flex items-center gap-1"
    >
      {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
      Cancelar
    </button>
  );
}