export async function Register(root) {
    root.innerHTML = `
    <div class="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="w-full max-w-md p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
                <p class="text-zinc-400">Únete para gestionar tus licencias</p>
            </div>
            
            <form id="register-form" class="space-y-4">
                <div id="register-error" class="hidden p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"></div>
                
                <div class="space-y-2">
                    <label class="text-sm font-medium text-zinc-300">Nombre</label>
                    <input type="text" id="name" required class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-medium text-zinc-300">Email</label>
                    <input type="email" id="email" required class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                </div>
                
                <div class="space-y-2">
                    <label class="text-sm font-medium text-zinc-300">Contraseña</label>
                    <input type="password" id="password" required class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                </div>
                
                <button type="submit" class="w-full bg-white text-black font-bold rounded-xl px-4 py-3 hover:bg-zinc-200 transition-colors mt-6">
                    Registrarse
                </button>
            </form>
            
            <p class="mt-6 text-center text-zinc-400 text-sm">
                ¿Ya tienes cuenta? <a href="/login" data-link class="text-white hover:underline">Iniciar Sesión</a>
            </p>
        </div>
    </div>
    `;

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errDiv = document.getElementById('register-error');
        
        try {
            const res = await fetch('/api/v2/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                window.location.href = '/login'; // Redirect to login on success
            } else {
                errDiv.textContent = data.error || 'Error al registrarse';
                errDiv.classList.remove('hidden');
            }
        } catch (err) {
            errDiv.textContent = 'Error de red';
            errDiv.classList.remove('hidden');
        }
    });
}
