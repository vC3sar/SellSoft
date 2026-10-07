export async function ProductDetail(root) {
    const slug = window.location.pathname.split('/').pop();
    
    try {
        // En una app real, el endpoint devolvería por slug. Aquí emularemos filtrando de todos
        const res = await fetch('/api/v2/products');
        const data = await res.json();
        const products = Array.isArray(data) ? data : data.products || [];
        const product = products.find(p => p.slug === slug);

        if (!product) {
            root.innerHTML = `<div class="p-24 text-center text-white text-2xl">Producto no encontrado</div>`;
            return;
        }

        root.innerHTML = `
        <div class="container mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <a href="/products" data-link class="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
                ← Volver a productos
            </a>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="rounded-3xl border border-white/10 bg-zinc-900/50 overflow-hidden aspect-square flex items-center justify-center p-8">
                    ${product.imageUrl 
                        ? `<img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-contain rounded-2xl">` 
                        : `<div class="text-zinc-600">Sin imagen</div>`
                    }
                </div>
                
                <div class="flex flex-col">
                    <h1 class="text-4xl font-bold text-white mb-4">${product.name}</h1>
                    <div class="text-3xl font-black text-white mb-6">$${product.price}</div>
                    
                    <p class="text-zinc-300 text-lg mb-8 leading-relaxed">
                        ${product.description || product.shortDescription || 'Sin descripción'}
                    </p>
                    
                    <div class="mt-auto">
                        <button id="add-to-cart" class="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors text-lg mb-4">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.getElementById('add-to-cart').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.length;
            cartCount.classList.remove('hidden');
            
            alert('Producto agregado al carrito');
        });
    } catch (e) {
        root.innerHTML = `<div class="p-24 text-center text-red-500">Error al cargar el producto</div>`;
    }
}
