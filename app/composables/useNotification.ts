// composables/useNotification.ts
export const useNotification = () => {

    async function requestPermission() {
        if (!('Notification' in window)) {
            console.warn('Browser tidak support notification')
            return false
        }

        if (Notification.permission === 'granted') return true

        const permission = await Notification.requestPermission()
        return permission === 'granted'
    }

    async function notify(title: string, options?: NotificationOptions) {
        const granted = await requestPermission()
        if (!granted) return

        // kirim lewat Service Worker supaya muncul walau tab tidak aktif
        const registration = await navigator.serviceWorker.ready
        registration.showNotification(title, {
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            ...options
        })
    }

    return { requestPermission, notify }
}