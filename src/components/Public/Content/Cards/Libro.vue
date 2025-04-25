<template>
    <div class="rounded-md p-1 cursor-pointer">
        <div class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 border border-gray-200 dark:border-none hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-cyan-800 dark:text-zinc-100 mb-2">{{ title }}</h3>
            <p class="text-sm text-gray-500 dark:text-zinc-300 mb-1">Autor: {{ author }}</p>
            <p class="text-sm text-gray-500 dark:text-zinc-300 mb-1">De {{ formattedDate }}</p>
            <p class="text-gray-700 dark:text-zinc-200 mb-4 line-clamp-3">{{ description }}</p>        

            <a :href="link" target="_blank"
                class="inline-block mt-auto text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded transition">
                Ver Libro            
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Books } from '../../../../interfaces/Content'
const props = defineProps<Books>()
    const formattedDate = computed(() =>
    new Date(props.publication_date).toLocaleDateString('es-MX', {        
        year: 'numeric',
    })
)
</script>