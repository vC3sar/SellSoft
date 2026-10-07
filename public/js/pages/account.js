export async function Account(root) {
    try {
        const res = await fetch('/api/v2/auth/session');
        const data = await res.json();

        if (!data.user) {
            window.location.href = '/login';
            return;
        }

        root.innerHTML = `
        <div class="container mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">Mi Cuenta</h1>
            <p class="text-zinc-400 mb-12 text-lg">Gestiona tu perfil y tus compras.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-1">
                    <div class="bg-zinc-900/40 rounded-3xl border border-white/5 p-8 text-center backdrop-blur-xl">
                        <div class="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                            ${data.user.name ? data.user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">${data.user.name || 'Usuario'}</h2>
                        <p class="text-zinc-400 mb-6">${data.user.email}</p>
                        <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-white mb-8 border border-white/10">
                            Rol: ${data.user.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                        </span>
                    </div>
                </div>
                
                <div class="md:col-span-2">
                    <div class="bg-zinc-900/40 rounded-3xl border border-white/5 p-8 backdrop-blur-xl">
                        <h3 class="text-2xl font-bold text-white mb-6">Mis Compras Recientes</h3>
                        <div class="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
                            <p class="text-zinc-500 mb-4">Aún no tienes compras registradas.</p>
                            <a href="/products" data-link class="text-indigo-400 hover:text-indigo-300 font-medium">Explorar tienda</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    } catch (e) {
        root.innerHTML = `<div class="p-24 text-center text-red-500">Error al cargar la cuenta</div>`;
    }
}
