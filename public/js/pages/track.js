export async function Track(root) {
    root.innerHTML = `
    <div class="min-h-[70vh] flex items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="w-full max-w-xl p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl text-center">
            <div class="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center mx-auto mb-6 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>
            </div>
            
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Rastrear tu compra</h1>
            <p class="text-zinc-400 mb-8 text-lg">
                Ingresa el ID de tu orden o tu correo electrónico para obtener el estado y tus licencias de software.
            </p>
            
            <form id="track-form" class="space-y-4">
                <input type="text" placeholder="ID de la orden o Email" required class="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-center">
                
                <button type="submit" class="w-full bg-white text-black font-bold rounded-xl px-6 py-4 hover:bg-zinc-200 transition-colors text-lg">
                    Buscar orden
                </button>
            </form>
        </div>
    </div>
    `;

    document.getElementById('track-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Funcionalidad de rastreo por implementar en el backend');
    });
}
