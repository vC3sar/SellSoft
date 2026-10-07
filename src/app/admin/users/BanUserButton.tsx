"\"use client\";\
\
import { useTransition } from \"react\";\
import { toast } from \"sonner\";\
import { UserX, UserCheck, Loader2 } from \"lucide-react\";\
\
export function BanUserButton({ \
  userId, \
  isBanned, \
  onToggle \
}: { \
  userId: string; \
  isBanned: boolean; \
  onToggle: (id: string) => Promise<void>; \
}) {\
  const [isPending, startTransition] = useTransition();\
\
  const handleToggle = () => {\
    startTransition(async () => {\
      try {\
        await onToggle(userId);\
        toast.success(isBanned ? \"Usuario desbaneado exitosamente\" : \"Usuario baneado\");\
      } catch (e) {\
        toast.error(\"Ocurrió un error\");\
      }\
    });\
  };\
\
  return (\
    <button \
      disabled={isPending}\
      onClick={handleToggle}\
      className=\"text-sm px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2\"\
    >\
      {isPending ? <Loader2 className=\"w-4 h-4 animate-spin\" /> : null}\
      {isBanned ? \"Desbanear\" : \"Banear\"}\
    </button>\
  );\
}"