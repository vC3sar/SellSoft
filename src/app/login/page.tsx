"\"use client\";\
\
import { useState } from \"react\";\
import { signIn } from \"next-auth/react\";\
import { useRouter } from \"next/navigation\";\
\
export default function LoginPage() {\
  const [email, setEmail] = useState(\"\");\
  const [password, setPassword] = useState(\"\");\
  const [error, setError] = useState(\"\");\
  const router = useRouter();\
\
  const handleSubmit = async (e: React.FormEvent) => {\
    e.preventDefault();\
    const res = await signIn(\"credentials\", {\
      email,\
      password,\
      redirect: false,\
    });\
\
    if (res?.error) {\
      setError(\"Credenciales inválidas\");\
    } else {\
      router.push(\"/account\");\
      router.refresh();\
    }\
  };\
\
  return (\
    <div className=\"container mx-auto px-4 py-24 max-w-md\">\
      <div className=\"p-8 rounded-3xl glass\">\
        <h1 className=\"text-3xl font-bold mb-6 text-center\">Iniciar Sesión</h1>\
        {error && <div className=\"bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-center\">{error}</div>}\
        <form onSubmit={handleSubmit} className=\"space-y-4\">\
          <div>\
            <label className=\"block text-sm text-zinc-400 mb-1\">Email</label>\
            <input \
              type=\"email\" \
              className=\"w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white\" \
              value={email} onChange={(e) => setEmail(e.target.value)} required \
            />\
          </div>\
          <div>\
            <label className=\"block text-sm text-zinc-400 mb-1\">Contraseña</label>\
            <input \
              type=\"password\" \
              className=\"w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white\" \
              value={password} onChange={(e) => setPassword(e.target.value)} required \
            />\
          </div>\
          <button className=\"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-4 transition-colors\">\
            Entrar\
          </button>\
        </form>
<truncated 38 bytes>