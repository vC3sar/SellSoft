export async function Home(root) {
    root.innerHTML = `
    <div class="flex flex-col items-center overflow-hidden selection:bg-indigo-500/30">
      <!-- Dynamic Liquid Glass Background -->
      <div class="fixed inset-0 -z-10 bg-black">
        <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/30 blur-[120px] mix-blend-screen animate-pulse" style="animation-duration: 8s"></div>
        <div class="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-600/20 blur-[150px] mix-blend-screen animate-pulse" style="animation-duration: 12s"></div>
        <div class="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-600/20 blur-[100px] mix-blend-screen"></div>
      </div>

      <!-- Hero Section -->
      <section class="w-full relative pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[90vh]">
        <div class="container mx-auto px-4 flex flex-col items-center text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <a href="/products" data-link class="group inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 mb-8 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <span class="flex h-2 w-2 rounded-full bg-emerald-500 mr-3 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            Plataforma activa y entregando
            <span class="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
          </a>
          
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-balance max-w-5xl leading-[1.1]">
            Software y licencias al <span class="text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-cyan-400 drop-shadow-sm">instante.</span>
          </h1>
          
          <p class="text-lg md:text-2xl text-zinc-400 max-w-2xl text-balance mb-12 font-medium leading-relaxed">
            Compra, recibe y descarga tus productos digitales mágicamente. Sin esperas, sin complicaciones. Diseñado para ti.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center">
            <a href="/products" data-link class="group relative inline-flex items-center justify-center rounded-full bg-white text-zinc-950 px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105 active:scale-95 gap-2 overflow-hidden w-full sm:w-auto">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative z-10 flex items-center gap-2">
                Explorar catálogo
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
            
            <a href="/track" data-link class="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-2xl hover:bg-white/10 text-white px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              Rastrear compra
            </a>
          </div>
        </div>

        <div class="absolute bottom-0 translate-y-1/2 w-full max-w-4xl mx-auto px-4 z-0 pointer-events-none opacity-50 md:opacity-100">
          <div class="w-full h-48 md:h-64 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_-20px_50px_rgba(79,70,229,0.15)] flex items-start justify-center p-8 overflow-hidden mask-image-b">
            <div class="w-3/4 h-8 rounded-full bg-white/5 mb-4"></div>
          </div>
        </div>
      </section>

      <section class="w-full py-32 relative z-10">
        <div class="container mx-auto px-4">
          <div class="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Todo lo que necesitas.
            </h2>
            <p class="text-zinc-400 text-lg">La mejor experiencia de compra digital.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <!-- Cards... -->
            <div class="group flex flex-col p-8 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(79,70,229,0.1)] hover:-translate-y-2">
              <h3 class="text-2xl font-bold mb-3 text-white">Entrega Inmediata</h3>
              <p class="text-zinc-400 leading-relaxed font-medium">Recibe tus licencias automáticamente al confirmar el pago.</p>
            </div>
            <div class="group flex flex-col p-8 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:-translate-y-2">
              <h3 class="text-2xl font-bold mb-3 text-white">Pago Seguro</h3>
              <p class="text-zinc-400 leading-relaxed font-medium">Procesamos transacciones 100% seguras con Mercado Pago.</p>
            </div>
            <div class="group flex flex-col p-8 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] hover:-translate-y-2">
              <h3 class="text-2xl font-bold mb-3 text-white">Descargas Privadas</h3>
              <p class="text-zinc-400 leading-relaxed font-medium">Enlaces directos y temporales para asegurar tu software.</p>
            </div>
          </div>
        </div>
      </section>
      
      <style>
        .mask-image-b {
          mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        }
      </style>
    </div>
    `;
}
