import { Router } from './router.js';
import { Home } from './pages/home.js';
import { Products } from './pages/products.js';
import { Login } from './pages/login.js';
import { Register } from './pages/register.js';
import { ProductDetail } from './pages/productDetail.js';
import { Cart } from './pages/cart.js';
import { Track } from './pages/track.js';
import { NotFound } from './pages/notFound.js';
import { Account } from './pages/account.js';
import { Admin } from './pages/admin.js';
// Add more pages here

const routes = [
    { path: '/', render: Home },
    { path: '/products', render: Products },
    { path: /^\/products\/([^/]+)$/, render: ProductDetail },
    { path: '/login', render: Login },
    { path: '/register', render: Register },
    { path: '/cart', render: Cart },
    { path: '/track', render: Track },
    { path: '/account', render: Account },
    { path: '/admin', render: Admin },
    { path: '*', render: NotFound }
];

// Initialize app
const app = new Router(routes);

// Check auth status
async function checkAuth() {
    try {
        const res = await fetch('/api/v2/auth/session');
        if (res.ok) {
            const data = await res.json();
            const authSection = document.getElementById('auth-section');
            if (data.user) {
                authSection.innerHTML = `
                    ${data.user.role === 'ADMIN' ? '<a href="/admin" data-link class="text-sm font-semibold text-emerald-400 hover:text-emerald-300">Admin</a>' : ''}
                    <a href="/account" data-link class="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all">Cuenta</a>
                    <button id="logout-btn" class="text-sm text-red-400 hover:text-red-300">Salir</button>
                `;
                document.getElementById('logout-btn').addEventListener('click', async () => {
                    await fetch('/api/v2/auth/logout', { method: 'POST' });
                    window.location.href = '/';
                });
            } else {
                authSection.innerHTML = `
                    <a href="/login" data-link class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Iniciar Sesión</a>
                    <a href="/register" data-link class="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">Crear Cuenta</a>
                `;
            }
        }
    } catch (e) {
        console.error("Auth check failed", e);
    }
}

checkAuth();
