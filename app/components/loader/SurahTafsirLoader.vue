<template>
    <div v-if="props.loading" key="loading">
        <div class="relative overflow-hidden bg-linear-to-br from-indigo-900 via-indigo-800 to-violet-900 px-6 py-10">
            <div class="flex flex-col items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-white/20 animate-pulse" />
                <div class="h-10 w-48 rounded-xl bg-white/20 animate-pulse" />
                <div class="h-6 w-32 rounded-lg bg-white/15 animate-pulse" />
                <div class="h-4 w-24 rounded-lg bg-white/10 animate-pulse" />
                <div class="mt-2 flex gap-2">
                <div class="h-6 w-16 rounded-full bg-white/15 animate-pulse" />
                <div class="h-6 w-20 rounded-full bg-white/15 animate-pulse" />
                </div>
            </div>
        </div>
        <UContainer class="py-8 space-y-4">
            <div
                v-for="i in 6" :key="i"
                class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-3"
            >
                <div class="h-5 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 animate-pulse" />
                <div class="space-y-2">
                <div class="h-3 w-full rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                <div class="h-3 w-5/6 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                <div class="h-3 w-4/6 rounded bg-stone-100 dark:bg-zinc-800 animate-pulse" />
                <div class="h-3 w-full rounded bg-stone-100 dark:bg-zinc-800 animate-pulse" />
                </div>
            </div>
        </UContainer>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>()
</script>