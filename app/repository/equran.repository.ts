import { db } from "~/composables/useDB"
import type { EQuranById, EQuranByIdResponse, EQuranSurahItem, EQuranResponse, EQuranTafsirById, EQuranTafsirByIdResponse } from "~/models/equran.models"
import { SYNC_INTERVAL } from "~/utils/interval.constant"

export class EQuranRepository {

    static KEY = "equran"
    static KEY_EQURAN_SURAH_BY_ID = "equran-by-id"
    static KEY_EQURAN_TAFSIR_BY_ID = "equran-tafsir-by-id"

    static async getAllSurah() : Promise<EQuranSurahItem[]> {

        try {

            // Cek apakah cache masih fresh
            const meta = await db.meta.get(this.KEY)
            const isStale = !meta || (Date.now() - new Date(meta.lastSync).getTime() > SYNC_INTERVAL)

            if (isStale) {
                // Fetch semua data dari API (tanpa pagination — simpan semua ke IndexedDB)
                const response = await $fetch<EQuranResponse>('https://equran.id/api/v2/surat', { method: 'GET' })
                await db.equranSurah.bulkPut(response.data)
                await db.meta.put({ key: this.KEY, lastSync: Date.now() })
            }

        } catch {
            console.warn('Fetch gagal, menggunakan cache lokal')
        }

        // ─── Query dari IndexedDB ─────────────────────────────
        return await db.equranSurah.orderBy('nomor').toArray()
    }

    static async getDetailSurahBySurahNumber(id: number): Promise<EQuranById | undefined> {
        try {
            // Key unik per surah
            const metaKey = `${this.KEY_EQURAN_SURAH_BY_ID}_${id}`
            const meta = await db.meta.get(metaKey)
            const isStale = !meta || (Date.now() - new Date(meta.lastSync).getTime() > SYNC_INTERVAL)

            if (isStale) {
                const response = await $fetch<EQuranByIdResponse>(`https://equran.id/api/v2/surat/${id}`, { method: 'GET' })
                await db.equranSurahById.put(response.data)
                await db.meta.put({ key: metaKey, lastSync: Date.now() })
            }
        } catch (error) {
            console.warn('Fetch gagal, menggunakan cache lokal')
        }

        return db.equranSurahById.get(id)
    }

    static async getTafsirSurahBySurahNumber(id: number) : Promise<EQuranTafsirById | undefined> {

        try {

            const meta = await db.meta.get(this.KEY_EQURAN_TAFSIR_BY_ID)
            const isStale = !meta || (Date.now() - new Date(meta.lastSync).getTime() > SYNC_INTERVAL)

            if(isStale){
                const response = await $fetch<EQuranTafsirByIdResponse>(`https://equran.id/api/v2/tafsir/${id}`, { method: 'GET' })
                await db.equranTafsirById.add(response.data)
                await db.meta.put({ key: this.KEY_EQURAN_TAFSIR_BY_ID, lastSync: Date.now() })
            }
            
        } catch (error) {
            console.warn('Fetch gagal, menggunakan cache lokal')
        }

        // ─── Query dari IndexedDB ─────────────────────────────
        return db.equranTafsirById.get(id)
    }
}