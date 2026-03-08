<template>
    <div class="w-full h-full flex items-center justify-center mt-3">
        <UTable 
            sticky 
            :data="surahList" 
            class="border rounded-2xl light:border-gray-200 dark:border-gray-100 flex-1 max-h-screen"
            :columns="columns"
        />
    </div>

    <UModal fullscreen description="" title="Detail Surah" :close="{ onClick: () => { openDetailSurahModal = false } }" :open="openDetailSurahModal">
        <template #body>
            <UContainer>
                <pre>
                    {{ surahDetail }}
                </pre>  
            </UContainer>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { useEQuran } from '~/composables/useEQuran';
import type { EQuranSurahItem } from '~/models/equran.models';

const { 
    surahList,
    surahDetail,
    surahTafsir,
    openDetailSurahModal,
    selectedSurah,
    getSurahById,
    showDetailSurah,
    getSurahTafsirById
} = useEQuran()

const UButton = resolveComponent('UButton')

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

</script>

<style scoped>

</style>