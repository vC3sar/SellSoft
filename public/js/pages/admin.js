export async function Admin(root) {
    try {
        const res = await fetch('/api/v2/auth/session');
        const data = await res.json();

        if (!data.user || data.user.role !== 'ADMIN') {
            root.innerHTML = `
            <div class="min-h-[70vh] flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl font-bold text-red-500 mb-4">Acceso Denegado</h1>
                <p class="text-zinc-400 mb-8">No tienes permisos de administrador para ver esta página.</p>
                <a href="/" data-link class="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">Volver al inicio</a>
            </div>
            `;
            return;
        }

        root.innerHTML = `
        <div class="container mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">Panel de Administración</h1>
            <p class="text-emerald-400 mb-12 text-lg font-medium">Bienvenido, administrador ${data.user.name || ''}.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Dashboard Cards -->
                <div class="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:border-emerald-500/30 transition-colors cursor-pointer group">
                    <h3 class="text-zinc-400 mb-2 font-medium">Ventas Totales</h3>
                    <p class="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">$0.00</p>
                </div>
                <div class="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-colors cursor-pointer group">
                    <h3 class="text-zinc-400 mb-2 font-medium">Órdenes</h3>
                    <p class="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">0</p>
                </div>
                <div class="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:border-cyan-500/30 transition-colors cursor-pointer group">
                    <h3 class="text-zinc-400 mb-2 font-medium">Productos</h3>
                    <p class="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">Gestión</p>
                </div>
                <div class="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:border-purple-500/30 transition-colors cursor-pointer group">
                    <h3 class="text-zinc-400 mb-2 font-medium">Usuarios</h3>
                    <p class="text-3xl font-black text-white group-hover:text-purple-400 transition-colors">Ajustes</p>
                </div>
            </div>
            
            <div class="mt-12 bg-zinc-900/40 border border-white/5 rounded-3xl p-8 min-h-[400px] flex items-center justify-center">
                <p class="text-zinc-500 text-lg">Módulos de administración en construcción para Vanilla JS.</p>
            </div>
        </div>
        `;
    } catch (e) {
        root.innerHTML = `<div class="p-24 text-center text-red-500">Error interno de sesión</div>`;
    }
}
