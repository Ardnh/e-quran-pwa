<template>
    <!-- Header -->
    <UHeader>
        <template #title>
            <div class="">EQURAN</div>
        </template>

        <template #right>
            <UColorModeButton />
        </template>
    </UHeader>

    <!-- Main -->
    <UMain>
        <UContainer>
            <slot />
        </UContainer>
    </UMain>

    <UFooter>
        <template #left>
        <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
        </template>
    </UFooter>
</template>
<script setup lang="ts">
</script>