// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: 'manifest', href: '/manifest.webmanifest' }
            ]
        }
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@vite-pwa/nuxt'],
    css: ['~/assets/css/main.css'],
    nitro: {
        preset: 'cloudflare-pages',
        prerender: {
            autoSubfolderIndex: false
        }
    },
    routeRules: {
        '/**': { prerender: false }
    },
    pwa: {
        registerType: 'autoUpdate',
        srcDir: './',
        filename: 'sw.ts',
        strategies: 'injectManifest',
        manifest: {
            name: 'My Nuxt App',
            short_name: 'NuxtApp',
            description: 'My awesome Nuxt PWA',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            icons: [
                {
                    src: 'icons/web-app-manifest-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: 'icons/web-app-manifest-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: 'icons/web-app-manifest-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
        devOptions: {
            enabled: true,        // aktifkan SW saat development
            type: 'module',
            suppressWarnings: true,
        },
        injectManifest: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
        
    }
})