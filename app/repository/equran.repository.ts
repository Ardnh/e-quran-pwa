import { db } from "~/composables/useDB"
import type { EQuranById, EQuranByIdResponse, EQuranSurahItem, EQuranResponse, EQuranTafsirById, EQuranTafsirByIdResponse } from "~/models/equran.models"
import { SYNC_INTERVAL } from "~/utils/interval.constant"

export class EQuranRepository {

    static KEY = "equran"
    static KEY_EQURAN_SURAH_BY_ID = "equran-by-id"
    static KEY_EQURAN_TAFSIR_BY_ID = "equran-tafsir-by-id"

    static async getAllSurah(): Promise<EQuranSurahItem[]> {
        try {

            let result = await db.equranSurah.orderBy('nomor').toArray()

            if (result.length === 0) {
                const response = await $fetch<EQuranResponse>('https://equran.id/api/v2/surat', { method: 'GET' })

                const dataWithMarking = response.data.map((item) => ({
                    ...item,
                    isSurahDetailOfflineAvailable: false,
                    isSurahTafsirOfflineAvailable: false,
                }))

                await db.equranSurah.bulkPut(dataWithMarking)
                await db.meta.put({ key: this.KEY, lastSync: Date.now() })

                result = await db.equranSurah.orderBy('nomor').toArray()
            }

            return result

        } catch (error) {
            console.warn('⚠️ Fetch gagal, menggunakan cache lokal', error)
            return await db.equranSurah.orderBy('nomor').toArray()
        }

    }

    static async getDetailSurahBySurahNumber(id: number): Promise<EQuranById | undefined> {
        try {
            const metaKey = `${this.KEY_EQURAN_SURAH_BY_ID}_${id}`
            const meta = await db.meta.get(metaKey)
            const isStale = !meta || (Date.now() - new Date(meta.lastSync).getTime() > SYNC_INTERVAL)
            if (isStale) {
                const response = await $fetch<EQuranByIdResponse>(`https://equran.id/api/v2/surat/${id}`, { method: 'GET' })

                const surahList = await db.equranSurah.get(id)
                if (surahList && !surahList.isSurahDetailOfflineAvailable) {
                    await db.equranSurah.update(id, { isSurahDetailOfflineAvailable: true })
                }

                await db.equranSurahById.put(response.data)
                await db.meta.put({ key: metaKey, lastSync: Date.now() })
            }
        } catch (error) {
            console.warn(`⚠️ Fetch gagal untuk surah #${id}, menggunakan cache lokal`, error)
        }

        const result = await db.equranSurahById.get(id)
        return result
    }

    static async getTafsirSurahBySurahNumber(id: number): Promise<EQuranTafsirById | undefined> {
        try {
            const metaKey = `${this.KEY_EQURAN_TAFSIR_BY_ID}_${id}`
            const meta = await db.meta.get(metaKey)
            const isStale = !meta || (Date.now() - new Date(meta.lastSync).getTime() > SYNC_INTERVAL)

            if (isStale) {
                const response = await $fetch<EQuranTafsirByIdResponse>(`https://equran.id/api/v2/tafsir/${id}`, { method: 'GET' })

                const surahList = await db.equranSurah.get(id)
                if (surahList && !surahList.isSurahTafsirOfflineAvailable) {
                    await db.equranSurah.update(id, { isSurahTafsirOfflineAvailable: true })
                }

                await db.equranTafsirById.put(response.data)
                await db.meta.put({ key: metaKey, lastSync: Date.now() })
            }
        } catch (error) {
            console.warn(`⚠️ Fetch gagal untuk tafsir #${id}, menggunakan cache lokal`, error)
        }

        const result = await db.equranTafsirById.get(id)
        return result
    }
}