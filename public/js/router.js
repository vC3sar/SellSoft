export class Router {
    constructor(routes) {
        this.routes = routes;
        this.root = document.getElementById('app-root');
        
        window.addEventListener('popstate', () => this.handleRoute());
        
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.href);
            } else if (e.target.closest('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.closest('[data-link]').href);
            }
        });
        
        this.handleRoute();
    }

    navigate(url) {
        history.pushState(null, null, url);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        let route = this.routes.find(r => {
            // Simple string match or regex match
            if (typeof r.path === 'string') {
                return r.path === path;
            }
            return r.path.test(path);
        });

        if (!route) {
            route = this.routes.find(r => r.path === '*');
        }

        if (route) {
            try {
                this.root.innerHTML = '<div class="flex justify-center p-12"><div class="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div></div>';
                await route.render(this.root, path);
            } catch (err) {
                console.error(err);
                this.root.innerHTML = '<div class="p-8 text-red-500 text-center">Error loading page</div>';
            }
        }
    }
}
