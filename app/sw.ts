/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// ==============================
// 1. Precache — asset statis (auto-generated oleh Vite PWA)
// ==============================
precacheAndRoute(self.__WB_MANIFEST)

// ketika user klik notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    // fokus ke tab app, atau buka tab baru kalau belum terbuka
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clients) => {
            for (const client of clients) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus()
                }
            }
            return self.clients.openWindow('/')
        })
    )
})