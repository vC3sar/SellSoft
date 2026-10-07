export async function Cart(root) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    function renderCart() {
        if (cart.length === 0) {
            return `
            <div class="text-center py-24">
                <h2 class="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h2>
                <p class="text-zinc-400 mb-8">Parece que aún no has agregado productos.</p>
                <a href="/products" data-link class="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-200 transition-colors">
                    Explorar productos
                </a>
            </div>
            `;
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);

        let itemsHtml = cart.map((item, index) => `
            <div class="flex items-center gap-6 p-6 border-b border-white/10 last:border-0">
                <div class="w-24 h-24 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                    ${item.imageUrl ? `<img src="${item.imageUrl}" class="w-full h-full object-cover">` : ''}
                </div>
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-white">${item.name}</h3>
                    <div class="text-lg text-zinc-300 mt-1">$${item.price}</div>
                </div>
                <button class="text-red-400 hover:text-red-300 p-2 remove-item" data-index="${index}">Eliminar</button>
            </div>
        `).join('');

        return `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden">
                ${itemsHtml}
            </div>
            
            <div class="bg-zinc-900/40 rounded-3xl border border-white/5 p-8 h-fit sticky top-24">
                <h3 class="text-xl font-bold text-white mb-6">Resumen de compra</h3>
                <div class="flex justify-between items-center mb-6 text-lg">
                    <span class="text-zinc-400">Total</span>
                    <span class="font-black text-3xl text-white">$${total}</span>
                </div>
                <button id="checkout-btn" class="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-colors text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    Proceder al pago
                </button>
            </div>
        </div>
        `;
    }

    root.innerHTML = `
    <div class="container mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <h1 class="text-4xl md:text-5xl font-bold mb-12 text-white">Carrito de compras</h1>
        <div id="cart-container">
            ${renderCart()}
        </div>
    </div>
    `;

    root.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('cart-container').innerHTML = renderCart();
            
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.length;
            if (cart.length === 0) cartCount.classList.add('hidden');
        }
    });
}
