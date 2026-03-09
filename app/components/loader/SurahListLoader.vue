<template>
    <div v-if="!props.loading" key="loading" class="w-full px-4 mt-3 space-y-2">
        <!-- Skeleton Rows -->
        <div
            v-for="i in 12"
            :key="i"
            class="flex items-center gap-4 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
        >
            <!-- Nomor surah -->
            <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
            <!-- Nama & keterangan -->
            <div class="flex-1 space-y-2">
                <div class="h-3 w-1/3 rounded bg-gray-300 dark:bg-gray-600" />
                <div class="h-2 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <!-- Tulisan Arab -->
            <div class="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600" />
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>()
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>