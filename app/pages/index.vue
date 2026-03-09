<template>
    <Transition name="fade" mode="out-in">
        <LoaderSurahListLoader v-if="!isMounted" :loading="!isMounted"/>

        <!-- Table State -->
        <div
            v-else
            key="table"
            class="w-full h-full flex items-center justify-center mt-3"
        >
            <UTable
                sticky
                :data="surahList"
                class="border rounded-2xl light:border-gray-200 dark:border-gray-700 flex-1 max-h-screen"
                :columns="columns"
                :loading="getAllSurahIsLoading"
                loading-color="primary"
                loading-animation="carousel"
            />
        </div>
    </Transition>

    <UModal
        fullscreen
        title="Detail surah"
        :description="`Surah ${surahDetail?.namaLatin ?? '-'}`"
        :close="{ onClick: onCloseModal }"
        :open="openDetailSurahModal"
    >
        <template #body>
            <UTabs color="neutral" variant="link" :ui="{ trigger: 'grow' }" :items="items" class="w-full">
                <template #surah="{ item }">
                    <div class="min-h-screen bg-stone-50 dark:bg-zinc-950 my-3" ref="modalBody">

                        <!-- ── LOADING STATE ── -->
                        <Transition name="fade" mode="out-in">
                            
                            <LoaderDetailSurahLoader v-if="getSurahByIdIsLoading" :loading="getSurahByIdIsLoading"/>

                            <!-- ── CONTENT ── -->
                            <div v-else key="content">

                                <!-- Hero Header -->
                                <div class="relative overflow-hidden bg-linear-to-br from-teal-800 via-teal-700 to-emerald-800 px-6 py-10 text-white">
                                    <div class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                                    <div class="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl" />
                                    <UContainer>
                                    <div class="relative flex flex-col items-center gap-3 text-center">
                                        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-semibold tracking-wide">
                                            {{ surahDetail?.nomor }}
                                        </span>
                                        <h1 class="text-5xl leading-relaxed tracking-widest text-amber-200" style="font-family: 'Scheherazade New', serif;">
                                            {{ surahDetail?.nama }}
                                        </h1>
                                        <div>
                                            <p class="text-2xl font-semibold tracking-tight text-white">{{ surahDetail?.namaLatin }}</p>
                                            <p class="mt-1 text-sm text-teal-200">"{{ surahDetail?.arti }}"</p>
                                        </div>
                                        <div class="mt-2 flex flex-wrap justify-center gap-2">
                                            <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                                                {{ surahDetail?.jumlahAyat }} Ayat
                                            </span>
                                            <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur capitalize">
                                                {{ surahDetail?.tempatTurun?.toLowerCase() }}
                                            </span>
                                        </div>
                                    </div>
                                    </UContainer>
                                </div>

                                <UContainer class="py-8">

                                    <!-- Deskripsi -->
                                    <div class="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                        <h2 class="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                                            <span class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                                            Deskripsi
                                            <span class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                                        </h2>
                                        <p class="text-sm leading-relaxed text-stone-600 dark:text-zinc-400" v-html="surahDetail?.deskripsi" />
                                    </div>

                                    <!-- Audio Full -->
                                    <div class="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                    <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                                        <span class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                                            Audio Surah Lengkap
                                        <span class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                                    </h2>
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <div
                                            v-for="(url, key) in surahDetail?.audioFull" :key="key"
                                            class="flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
                                        >
                                            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
                                                {{ key }}
                                            </span>
                                            <audio controls :src="url" class="h-8 w-full" />
                                        </div>
                                    </div>
                                    </div>

                                    <!-- Ayat -->
                                    <div class="mb-8">
                                        <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                                            <span class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                                                Ayat
                                            <span class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                                        </h2>
                                        <div class="space-y-4">
                                            <div
                                                v-for="ayat in surahDetail?.ayat" :key="ayat.nomorAyat"
                                                class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                            >
                                                <div class="mb-4 flex items-center justify-between">
                                                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                                                        {{ ayat.nomorAyat }}
                                                    </span>
                                                    <audio controls :src="ayat.audio['01']" class="h-8 max-w-60" />
                                                </div>
                                                <p class="mb-3 text-right text-3xl leading-loose text-stone-800 dark:text-stone-100" style="font-family: 'Scheherazade New', serif; direction: rtl;">
                                                    {{ ayat.teksArab }}
                                                </p>
                                                <p class="mb-2 text-sm italic text-stone-500 dark:text-zinc-400">{{ ayat.teksLatin }}</p>
                                                <p class="text-sm font-medium text-stone-700 dark:text-zinc-300">{{ ayat.teksIndonesia }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Navigasi -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div
                                            v-if="surahDetail?.suratSebelumnya"
                                            @click="getSurahBefore(surahDetail.nomor)"
                                            class="flex cursor-pointer flex-col gap-1 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-teal-400 dark:border-zinc-800 dark:bg-zinc-900"
                                        >
                                            <span class="text-xs text-stone-400 dark:text-zinc-500">← Sebelumnya</span>
                                            <span class="font-semibold text-stone-700 dark:text-zinc-200">{{ (surahDetail.suratSebelumnya as any)?.namaLatin }}</span>
                                            <span class="text-xs text-stone-400">{{ (surahDetail.suratSebelumnya as any)?.jumlahAyat }} ayat</span>
                                        </div>
                                        <div v-else />
                                        <div
                                            v-if="surahDetail?.suratSelanjutnya"
                                            @click.native="navigateSurahAndTafsir(surahDetail.suratSelanjutnya.nomor)"
                                            class="flex cursor-pointer flex-col items-end gap-1 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-teal-400 dark:border-zinc-800 dark:bg-zinc-900"
                                        >
                                            <span class="text-xs text-stone-400 dark:text-zinc-500">Selanjutnya →</span>
                                            <span class="font-semibold text-stone-700 dark:text-zinc-200">{{ surahDetail.suratSelanjutnya.namaLatin }}</span>
                                            <span class="text-xs text-stone-400">{{ surahDetail.suratSelanjutnya.jumlahAyat }} ayat</span>
                                        </div>
                                    </div>
                                </UContainer>
                            </div>
                        </Transition>
                        <Transition name="slide-up">
                            <button
                                v-if="showBackToTop"
                                class="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg transition hover:bg-teal-600 hover:scale-110 active:scale-95"
                                aria-label="Kembali ke atas"
                                @click="scrollToTop"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 15l-6-6-6 6"/>
                                </svg>
                            </button>
                        </Transition>
                    </div>
                </template>
                <template #tafsir="{ item }">
                    <div class="min-h-screen bg-stone-50 dark:bg-zinc-950 my-3" ref="tafsirModalBody">

                        <Transition name="fade" mode="out-in">

                            <!-- ── LOADING ── -->
                            <LoaderSurahTafsirLoader v-if="getSurahTafsirByIdIsloading" :loading="getSurahTafsirByIdIsloading"/>

                            <!-- ── CONTENT ── -->
                            <div v-else key="content">

                                <!-- Hero -->
                                <div class="relative overflow-hidden bg-linear-to-br from-indigo-900 via-indigo-800 to-violet-900 px-6 py-10 text-white">
                                    <div class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                                    <div class="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-violet-400/10 blur-2xl" />
                                    <UContainer>
                                        <div class="relative flex flex-col items-center gap-3 text-center">
                                            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-semibold">
                                                {{ surahTafsir?.nomor }}
                                            </span>
                                            <h1 class="text-5xl leading-relaxed tracking-widest text-amber-200" style="font-family: 'Scheherazade New', serif;">
                                                {{ surahTafsir?.nama }}
                                            </h1>
                                            <div>
                                                <p class="text-2xl font-semibold tracking-tight">{{ surahTafsir?.namaLatin }}</p>
                                                <p class="mt-1 text-sm text-indigo-200">"{{ surahTafsir?.arti }}"</p>
                                            </div>
                                            <div class="mt-2 flex flex-wrap justify-center gap-2">
                                                <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                                                {{ surahTafsir?.jumlahAyat }} Ayat
                                                </span>
                                                <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur capitalize">
                                                {{ surahTafsir?.tempatTurun?.toLowerCase() }}
                                                </span>
                                            </div>
                                        </div>
                                    </UContainer>
                                </div>

                                <UContainer class="py-8">

                                    <!-- Deskripsi -->
                                    <div class="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                        <h2 class="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
                                            <span class="h-px flex-1 bg-indigo-100 dark:bg-indigo-900" />
                                                Deskripsi
                                            <span class="h-px flex-1 bg-indigo-100 dark:bg-indigo-900" />
                                        </h2>
                                        <p class="text-sm leading-relaxed text-stone-600 dark:text-zinc-400" v-html="surahTafsir?.deskripsi" />
                                    </div>

                                    <!-- Tafsir Ayat -->
                                    <div class="mb-8">
                                        <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
                                            <span class="h-px flex-1 bg-indigo-100 dark:bg-indigo-900" />
                                            Tafsir Per Ayat
                                            <span class="h-px flex-1 bg-indigo-100 dark:bg-indigo-900" />
                                        </h2>

                                        <div class="space-y-4">
                                            <div
                                                v-for="tafsir in surahTafsir?.tafsir"
                                                :key="tafsir.ayat"
                                                class="rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden"
                                            >
                                                <!-- Header Ayat -->
                                                <div class="flex items-center gap-3 border-b border-stone-100 bg-stone-50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-800/60">
                                                    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xs font-bold text-white">
                                                        {{ tafsir.ayat }}
                                                    </span>
                                                    <span class="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                                        Ayat {{ tafsir.ayat }}
                                                    </span>
                                                </div>

                                                <!-- Teks Tafsir -->
                                                <div class="px-5 py-4">
                                                    <p class="text-sm leading-loose text-stone-700 dark:text-zinc-300">
                                                        {{ tafsir.teks }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Navigasi -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div
                                            v-if="surahTafsir?.suratSebelumnya"
                                            class="flex cursor-pointer flex-col gap-1 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                            @click="navigateSurahAndTafsir((surahTafsir.suratSebelumnya as any)?.nomor)"
                                        >
                                            <span class="text-xs text-stone-400 dark:text-zinc-500">← Sebelumnya</span>
                                            <span class="font-semibold text-stone-700 dark:text-zinc-200">{{ (surahTafsir.suratSebelumnya as any)?.namaLatin }}</span>
                                            <span class="text-xs text-stone-400">{{ (surahTafsir.suratSebelumnya as any)?.jumlahAyat }} ayat</span>
                                        </div>
                                        <div v-else />

                                        <div
                                            v-if="surahTafsir?.suratSelanjutnya"
                                            class="flex cursor-pointer flex-col items-end gap-1 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                            @click="navigateSurahAndTafsir(surahTafsir.suratSelanjutnya.nomor)"
                                        >
                                            <span class="text-xs text-stone-400 dark:text-zinc-500">Selanjutnya →</span>
                                            <span class="font-semibold text-stone-700 dark:text-zinc-200">{{ surahTafsir.suratSelanjutnya.namaLatin }}</span>
                                            <span class="text-xs text-stone-400">{{ surahTafsir.suratSelanjutnya.jumlahAyat }} ayat</span>
                                        </div>
                                    </div>
                                </UContainer>
                            </div>
                        </Transition>
                    </div>
                </template>
            </UTabs>
        </template>
    </UModal>
</template>
<script setup lang="ts">
import type { TableColumn, TabsItem } from '@nuxt/ui';
import { useEQuran } from '~/composables/useEQuran';
import type { EQuranSurahItem } from '~/models/equran.models';

const { 
    surahList,
    surahDetail,
    surahTafsir,
    openDetailSurahModal,
    getAllSurahIsLoading,
    isMounted,
    getSurahByIdIsLoading,
    showBackToTop,
    getSurahTafsirByIdIsloading,
    onCloseModal,
    navigateSurahAndTafsir,
    scrollToTop,
    getSurahBefore,
    showDetailSurah,
} = useEQuran()

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const columns: TableColumn<EQuranSurahItem>[] = [
    {
        accessorKey: 'nomor',
        header: 'Nomor Surat'
    },
    {
        accessorKey: 'nama',
        header: 'Nama Surat'
    },
    {
        accessorKey: 'namaLatin',
        header: 'Nama Latin'
    },
    {
        accessorKey: 'jumlahAyat',
        header: 'Jumlah Ayat'
    },
    {
        accessorKey: 'tempatTurun',
        header: 'Tempat Turun'
    },
    {
        accessorKey: 'arti',
        header: 'Arti'
    },
    {
        accessorKey: 'isSurahDetailOfflineAvailable',
        header: 'Surah',
        meta: {
            class: {
                td: 'text-right'
            }
        },
        cell: ({ row }) => {
            return h(UBadge, {
                    label: 'Offline : ' + row.original.isSurahDetailOfflineAvailable,
                    color: row.original.isSurahDetailOfflineAvailable ? 'primary': 'error',
                    variant: 'soft',
                    size: 'md',
                    class: 'rounded-full',
                    icon: row.original.isSurahDetailOfflineAvailable ? 'i-lucide-check' : 'i-lucide-x' ,
                })
        }
    },
    {
        accessorKey: 'isSurahTafsirOfflineAvailable',
        header: 'Tafsir',
        meta: {
            class: {
                td: 'text-right'
            }
        },
        cell: ({ row }) => {
            return h(UBadge, {
                    label: 'Offline : ' + row.original.isSurahTafsirOfflineAvailable,
                    color: row.original.isSurahTafsirOfflineAvailable ? 'primary': 'error',
                    variant: 'soft',
                    size: 'md',
                    class: 'rounded-full',
                    icon: row.original.isSurahTafsirOfflineAvailable ? 'i-lucide-check' : 'i-lucide-x' ,
                })
        }
    },
    {
        id: 'actions',
        meta: {
            class: {
                td: 'text-right'
            }
        },
        cell: ({ row }) => {
            return h(UButton, {
                    label: 'Baca',
                    color: 'primary',
                    variant: 'soft',
                    size: 'sm',
                    icon: 'i-lucide-book-open',
                    onClick: () => showDetailSurah(row.original)
                })
        }
    }
]

const items : TabsItem[] = [
    {
        label: 'Surah',
        icon: 'i-lucide-book-open',
        content: 'This is the surah content.',
        slot: 'surah' as const
    },
    {
        label: 'Tafsir',
        icon: 'i-lucide-telescope',
        content: 'This is the tafsir content.',
        slot: 'tafsir' as const
    }
] satisfies TabsItem[]
</script>

<style scoped>

</style>