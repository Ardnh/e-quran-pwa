import type { EQuranById, EQuranSurahItem, EQuranTafsirById } from "~/models/equran.models"
import { EQuranRepository } from "~/repository/equran.repository"

export const useEQuran = () => {

    const toast = useToast()

    const isMounted = ref(false)
    const surahList = ref<EQuranSurahItem[]>([])
    const surahDetail = ref<EQuranById | undefined>(undefined)
    const surahTafsir = ref<EQuranTafsirById | undefined>(undefined)
    const selectedSurah = ref<EQuranById | undefined>(undefined)

    const openDetailSurahModal = ref(false)

    const eQuranSummary = computed(() => {

        const totalSurah = 0
        const totalAyat = 0
        const totalSurahMakkah = 0
        const totalSurahMadinah = 0

        return {

        }
    })

    const getAllSurah = async () => {

        try {

            surahList.value = await EQuranRepository.getAllSurah()
            toast.add({
                title: 'Get All Surah',
                description: `Successfully get all surah`,
                icon: 'i-lucide-book-marked'
            })

        } catch (error) {
            surahList.value = []
        }

    }

    const getSurahById = async (id: number) => {
        try {

            surahDetail.value = await EQuranRepository.getDetailSurahBySurahNumber(id)

            console.log("surah by id")
            console.log(surahDetail.value)
            
        } catch (error) {
            toast.add({
                title: 'Failed to get surah by id',
                description: `Something went wrong`,
                icon: 'i-lucide-book-marked'
            })
        }
    }

    const getSurahTafsirById = async (id: number) => {
        try {

            surahTafsir.value = await EQuranRepository.getTafsirSurahBySurahNumber(id)
            
        } catch (error) {
            toast.add({
                title: 'Failed to get surah tafsir by id',
                description: `Something went wrong`,
                icon: 'i-lucide-book-marked'
            })
        }
    }

    const showDetailSurah = async (item: EQuranSurahItem) => {
        openDetailSurahModal.value = true
        await getSurahById(item.nomor)
    }

    onMounted(async () => {
        isMounted.value = true
        await getAllSurah()
    })

    return {
        surahList,
        surahDetail,
        surahTafsir,
        eQuranSummary,
        openDetailSurahModal,
        selectedSurah,
        showDetailSurah,
        getSurahById,
        getSurahTafsirById
    }
}