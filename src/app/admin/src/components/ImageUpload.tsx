"\"use client\";\
\
import { useState } from \"react\";\
import { Upload, Loader2, Image as ImageIcon } from \"lucide-react\";\
import { toast } from \"sonner\";\
\
export function ImageUpload({ value, onChange, label = \"Imagen\" }: { value: string, onChange: (url: string) => void, label?: string }) {\
  const [uploading, setUploading] = useState(false);\
\
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {\
    const file = e.target.files?.[0];\
    if (!file) return;\
\
    setUploading(true);\
    const formData = new FormData();\
    formData.append(\"file\", file);\
\
    try {\
      const res = await fetch(\"/api/upload\", {\
        method: \"POST\",\
        body: formData,\
      });\
\
      if (!res.ok) throw new Error(\"Fallo al subir imagen\");\
      \
      const data = await res.json();\
      onChange(data.url);\
      toast.success(\"Imagen subida correctamente\");\
    } catch (error) {\
      console.error(error);\
      toast.error(\"Error al subir imagen. Verifica tu conexión.\");\
    } finally {\
      setUploading(false);\
    }\
  };\
\
  return (\
    <div>\
      <label className=\"block text-xs font-black tracking-widest text-zinc-500 uppercase mb-2\">{label}</label>\
      <div className=\"flex gap-4 items-start\">\
        {value ? (\
          <div className=\"w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0\">\
            <img src={value} alt=\"Preview\" className=\"w-full h-full object-cover\" />\
          </div>\
        ) : (\
          <div className=\"w-16 h-16 rounded-xl bg-zinc-900 border border-white/10 shrink-0 flex items-center justify-center text-zinc-500\">\
            <ImageIcon className=\"w-6 h-6\" />\
          </div>\
        )}\
        <div className=\"flex-1\">\
          <div className=\"relative group cursor-pointer mb-2\">\
            <input \
              type=\"file\" \
              accept=\"image/*\"\
              onChange={handleUpload}\
              disabled={uploading}\
              cl
<truncated 1366 bytes>