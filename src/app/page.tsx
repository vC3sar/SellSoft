"import Link from \"next/link\";\
import { ArrowRight, Zap, Shield, Download } from \"lucide-react\";\
\
export default function Home() {\
  return (\
    <div className=\"flex flex-col items-center\">\
      {/* Hero Section */}\
      <section className=\"w-full relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32\">\
        <div className=\"absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 -z-10\" />\
        <div className=\"container mx-auto px-4 flex flex-col items-center text-center\">\
          <div className=\"inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 mb-8 backdrop-blur-sm\">\
            <span className=\"flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse\"></span>\
            Plataforma de software digital\
          </div>\
          <h1 className=\"text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-balance max-w-4xl\">\
            Software y licencias al <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400\">instante.</span>\
          </h1>\
          <p className=\"text-lg md:text-xl text-zinc-400 max-w-2xl text-balance mb-12\">\
            Compra, recibe y descarga tus productos digitales automáticamente. Sin esperas, sin complicaciones.\
          </p>\
          <div className=\"flex flex-col sm:flex-row gap-4 w-full sm:w-auto\">\
            <Link \
              href=\"/products\" \
              className=\"inline-flex items-center justify-center rounded-lg bg-white text-zinc-950 px-8 py-3.5 text-sm font-semibold hover:bg-zinc-200 transition-colors gap-2\"\
            >\
              Explorar productos\
              <ArrowRight className=\"w-4 h-4\" />\
            </Link>\
            <Link \
              href=\"/account\" \
              className=\"inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white px-8 py-3.
<truncated 2221 bytes>