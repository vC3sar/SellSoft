export async function Products(root) {
    try {
        const res = await fetch('/api/v2/products');
        const data = await res.json();
        
        // Ensure products are an array or inside an object
        const products = Array.isArray(data) ? data : data.products || [];

        let html = `
        <div class="container mx-auto px-4 py-24 min-h-screen animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Todos los productos</h1>
            <p class="text-zinc-400 mb-12 text-lg max-w-2xl">Descubre nuestro catálogo completo de software.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        `;

        if (products.length === 0) {
            html += `<div class="col-span-full text-center py-24 text-zinc-500">No se encontraron productos.</div>`;
        }

        products.forEach(product => {
            html += `
                <a href="/products/${product.slug}" data-link class="group flex flex-col bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:-translate-y-1 transition-all duration-300">
                    <div class="aspect-video w-full bg-zinc-800/50 relative overflow-hidden">
                        ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" loading="lazy">` : `<div class="w-full h-full flex items-center justify-center text-zinc-600">Sin imagen</div>`}
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex items-start justify-between gap-4 mb-2">
                            <h3 class="font-bold text-lg text-white leading-tight group-hover:text-indigo-400 transition-colors">${product.name}</h3>
                        </div>
                        <p class="text-sm text-zinc-400 mb-4 line-clamp-2">${product.shortDescription || product.description || ''}</p>
                        <div class="mt-auto flex items-center justify-between">
                            <span class="font-bold text-lg text-white">$${product.price}</span>
                            <span class="text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver detalles →</span>
                        </div>
                    </div>
                </a>
            `;
        });

        html += `
            </div>
        </div>
        `;
        
        root.innerHTML = html;
    } catch (e) {
        root.innerHTML = `<div class="p-8 text-center text-red-500">Error al cargar productos.</div>`;
        console.error(e);
    }
}
