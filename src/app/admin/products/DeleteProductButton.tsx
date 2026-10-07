"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto? Las licencias y órdenes asociadas podrían perderse si no tienes el diseño en cascada activado.")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        toast.success("Producto eliminado exitosamente");
        router.refresh();
      } else {
        toast.error("Error al eliminar producto");
      }
    } catch (e) {
      toast.error("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      disabled={loading}
      onClick={handleDelete}
      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}