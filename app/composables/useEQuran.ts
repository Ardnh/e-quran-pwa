import type { EQuranById, EQuranSurahItem, EQuranTafsirById } from "~/models/equran.models"
import { EQuranRepository } from "~/repository/equran.repository"

export const useEQuran = () => {

    const toast = useToast()

    const modalBody = ref<HTMLElement | null>(null)
    const showBackToTop = ref(false)

    const isMounted = ref(false)
    const surahList = ref<EQuranSurahItem[]>([])
    const surahDetail = ref<EQuranById | undefined>(undefined)
    const surahTafsir = ref<EQuranTafsirById | undefined>(undefined)
    const selectedSurah = ref<EQuranById | undefined>(undefined)

    const openDetailSurahModal = ref(false)
    const getAllSurahIsLoading = ref(false)
    const getSurahByIdIsLoading = ref(false)
    const getSurahTafsirByIdIsloading = ref(false)
    const getAllSurahIsFirstLoad = ref(false)

    const eQuranSummary = computed(() => {

        const totalSurah = 0
        const totalAyat = 0
        const totalSurahMakkah = 0
        const totalSurahMadinah = 0

        return {

        }
    })

    const getAllSurah = async () => {

        if (getAllSurahIsLoading.value) return
        getAllSurahIsLoading.value = true

        try {

            surahList.value = await EQuranRepository.getAllSurah()
            if (!getAllSurahIsFirstLoad.value) {
                getAllSurahIsFirstLoad.value = true
                toast.add({
                    title: 'Get All Surah',
                    description: `Successfully get all surah`,
                    icon: 'i-lucide-book-marked'
                })
            }

        } catch (error) {
            surahList.value = []
        } finally {
            getAllSurahIsLoading.value = false
        }

    }

    const getSurahById = async (id: number) => {

        if (getSurahByIdIsLoading.value) return
        getSurahByIdIsLoading.value = true

        try {
            surahDetail.value = await EQuranRepository.getDetailSurahBySurahNumber(id)
            scrollToTop()
        } catch (error) {
            toast.add({
                title: 'Failed to get surah by id',
                description: `Something went wrong`,
                icon: 'i-lucide-book-marked'
            })
        } finally {
            getSurahByIdIsLoading.value = false
        }
    }

    const getSurahBefore = async (currentNomorSurah: number) => {
        const surahBeforeNumber = currentNomorSurah - 1
        if (surahBeforeNumber <= 0) return

        await getSurahById(surahBeforeNumber)
        await getSurahTafsirById(surahBeforeNumber)
    }

    const navigateSurahAndTafsir = async (nomor: any) => {
        await getSurahById(nomor)
        await getSurahTafsirById(nomor)
    }

    const getSurahTafsirById = async (id: number) => {

        if (getSurahTafsirByIdIsloading.value) return
        getSurahTafsirByIdIsloading.value = true

        try {
            surahTafsir.value = await EQuranRepository.getTafsirSurahBySurahNumber(id)
        } catch (error) {
            toast.add({
                title: 'Failed to get surah tafsir by id',
                description: `Something went wrong`,
                icon: 'i-lucide-book-marked'
            })
        } finally {
            getSurahTafsirByIdIsloading.value = false
        }
    }

    const showDetailSurah = async (item: EQuranSurahItem) => {
        openDetailSurahModal.value = true
        await getSurahById(item.nomor)
        await getSurahTafsirById(item.nomor)
    }

    // Scroll to top — cari scrollable container milik UModal
    const getScrollContainer = () => {
        // UModal fullscreen biasanya wraps content di div dengan overflow-y-auto
        return modalBody.value?.closest('[data-radix-scroll-area-viewport]')
            ?? modalBody.value?.closest('.overflow-y-auto')
            ?? (modalBody.value?.parentElement as HTMLElement | null)
    }

    const scrollToTop = () => {
        const el = getScrollContainer()
        if (el) {
            el.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const onCloseModal = async () => {

        console.log("on close modal")

        await getAllSurah()
        openDetailSurahModal.value = false
    }

    onMounted(async () => {
        isMounted.value = true

        nextTick(() => {
            const el = getScrollContainer()
            if (!el) return

            el.addEventListener('scroll', () => {
                showBackToTop.value = el.scrollTop > 300
            })
        })

        await getAllSurah()
    })

    return {
        surahList,
        surahDetail,
        surahTafsir,
        eQuranSummary,
        openDetailSurahModal,
        selectedSurah,
        getAllSurahIsLoading,
        isMounted,
        getSurahByIdIsLoading,
        showBackToTop,
        modalBody,
        getSurahTafsirByIdIsloading,
        onCloseModal,
        navigateSurahAndTafsir,
        scrollToTop,
        getSurahBefore,
        showDetailSurah,
        getSurahById,
        getSurahTafsirById
    }
}