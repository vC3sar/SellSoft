export async function NotFound(root) {
  root.innerHTML = `
    <div class="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-10 selection:bg-indigo-500/30">
        <!-- Background Glowing Blobs -->
        <div class="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            <div class="w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen absolute -translate-x-20"></div>
            <div class="w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen absolute translate-x-20 translate-y-20"></div>
        </div>

        <div class="z-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000">
            <div class="nf-image floating-image">
                <img
                    src="/uploads/sellsoft.png"
                    alt="Error 404 Ilustración"
                />
            </div>
            
            <h1 class="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter mb-4 drop-shadow-sm">
                404
            </h1>
            
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
                Parece que te has perdido en el ciberespacio
            </h2>
            
            <p class="text-zinc-400 max-w-md text-lg mb-10 leading-relaxed font-medium">
                La página que estás buscando no existe, ha sido movida o está temporalmente fuera de servicio.
            </p>
            
            <a href="/" data-link class="group relative inline-flex items-center justify-center rounded-full bg-white text-zinc-950 px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105 active:scale-95 gap-2 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative z-10 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    Volver al inicio
                </span>
            </a>
        </div>

        <style>
            .nf-image {
                width: clamp(260px, 25vw, 420px);
                max-width: 100%;
                margin: 0 auto 2rem;
                padding: 0 16px;
                box-sizing: content-box;
                overflow: visible;
            }
            .nf-image img {
                display: block;
                width: 100%;
                height: auto;
                max-width: none;
                object-fit: contain;
                filter: drop-shadow(0 0 24px rgba(79,70,229,0.35));
            }
            .floating-image {
                animation: float 6s ease-in-out infinite;
            }
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }
        </style>
    </div>
    `;
}
