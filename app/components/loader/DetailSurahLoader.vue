<template>
   <div v-if="props.loading" key="loading">

        <!-- Skeleton Hero -->
        <div class="relative overflow-hidden bg-linear-to-br from-teal-800 via-teal-700 to-emerald-800 px-6 py-10">
            <div class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
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

        <UContainer class="py-8 space-y-6">

            <!-- Skeleton Deskripsi -->
            <div class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
                <div class="flex items-center gap-2">
                    <div class="h-px flex-1 bg-stone-100 dark:bg-zinc-800" />
                    <div class="h-4 w-24 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    <div class="h-px flex-1 bg-stone-100 dark:bg-zinc-800" />
                </div>
                <div class="space-y-2">
                    <div class="h-3 w-full rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    <div class="h-3 w-5/6 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    <div class="h-3 w-4/6 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    <div class="h-3 w-full rounded bg-stone-100 dark:bg-zinc-800 animate-pulse" />
                    <div class="h-3 w-3/4 rounded bg-stone-100 dark:bg-zinc-800 animate-pulse" />
                </div>
            </div>

            <!-- Skeleton Audio -->
            <div class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
                <div class="flex items-center gap-2">
                    <div class="h-px flex-1 bg-stone-100 dark:bg-zinc-800" />
                    <div class="h-4 w-36 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    <div class="h-px flex-1 bg-stone-100 dark:bg-zinc-800" />
                </div>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="i in 6" :key="i" class="flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
                        <div class="h-8 w-8 rounded-full bg-stone-200 dark:bg-zinc-700 animate-pulse shrink-0" />
                        <div class="h-8 flex-1 rounded-lg bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    </div>
                </div>
            </div>

            <!-- Skeleton Ayat -->
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <div class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                    <div class="h-4 w-16 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    <div class="h-px flex-1 bg-teal-100 dark:bg-teal-900" />
                </div>
                <div
                    v-for="i in 5" :key="i"
                    class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-4"
                    :style="{ animationDelay: `${i * 80}ms` }"
                >
                    <!-- Nomor + audio -->
                    <div class="flex items-center justify-between">
                        <div class="h-8 w-8 rounded-full bg-teal-200 dark:bg-teal-900/50 animate-pulse" />
                        <div class="h-8 w-44 rounded-lg bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                    </div>
                    <!-- Arab -->
                    <div class="flex flex-col items-end gap-2">
                        <div class="h-7 w-4/5 rounded-lg bg-stone-200 dark:bg-zinc-700 animate-pulse" />
                        <div class="h-7 w-3/5 rounded-lg bg-stone-100 dark:bg-zinc-800 animate-pulse" />
                    </div>
                    <!-- Latin -->
                    <div class="h-3 w-full rounded bg-stone-100 dark:bg-zinc-800 animate-pulse" />
                    <!-- Terjemahan -->
                    <div class="h-4 w-2/3 rounded bg-stone-200 dark:bg-zinc-700 animate-pulse" />
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