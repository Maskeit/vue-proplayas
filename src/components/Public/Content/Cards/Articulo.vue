<template>
    <div class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 border border-gray-200 dark:border-none hover:shadow-lg transition cursor-pointer">
        <h3 class="text-xl font-semibold text-cyan-800 dark:text-zinc-100 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-500 dark:text-zinc-300 mb-1">Tipo de articulo: {{ type }}</p>
        <p class="text-sm text-gray-600 dark:text-zinc-300 italic mb-3">doi: {{ doi }} issn: {{ issn }}</p>

        <p class="text-gray-700 dark:text-zinc-200 mb-4 line-clamp-3">{{ description }}</p>

        <!-- <div class="flex flex-wrap text-sm text-gray-600 gap-3 mb-4">
            <span class="bg-blue-100 text-cyan-800 px-2 py-1 rounded">Formato: {{ format }}</span> 
            <span v-if="" class="bg-green-100 text-green-800 px-2 py-1 rounded">Ubicación: {{ place }}</span>
        </div> -->

        <a :href="links" target="_blank"
            class="inline-block mt-auto text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded transition">
            Ir al Articulo            
        </a>
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { Articles } from '../../../../interfaces/Content';
defineProps<Articles>()
</script>