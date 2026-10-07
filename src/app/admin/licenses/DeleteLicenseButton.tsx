"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function DeleteLicenseButton({ id, disabled }: { id: string, disabled?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (disabled) return;
    if (!confirm("¿Eliminar esta licencia permanentemente del inventario?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/licenses/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        toast.success("Licencia eliminada exitosamente");
        router.refresh();
      } else {
        toast.error("Error al eliminar licencia");
      }
    } catch (e) {
      toast.error("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      disabled={disabled || loading}
      onClick={handleDelete}
      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors disabled:opacity-30 disabled:hover:bg-red-500/10 disabled:cursor-not-allowed"
      title={disabled ? "No puedes eliminar una licencia vendida" : "Eliminar licencia"}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}