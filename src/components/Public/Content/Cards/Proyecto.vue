<template>
    <div class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 border border-gray-200 dark:border-none hover:shadow-lg transition cursor-pointer">
        <h3 class="text-xl font-semibold text-cyan-800 dark:text-zinc-100 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-500 dark:text-zinc-300 mb-1">{{ formattedDate }}</p>
        <!-- <p class="text-sm text-gray-600 dark:text-zinc-300 italic mb-3">Organiza: {{ organizer_type }} #{{ organizer_id }}</p> -->

        <p class="text-gray-700 dark:text-zinc-200 mb-4 line-clamp-3">{{ description }}</p>

        <div class="flex flex-wrap text-sm text-gray-600 gap-3 mb-4">
            <!-- <span class="bg-blue-100 text-cyan-800 px-2 py-1 rounded">Formato: {{ format }}</span> -->
            <span v-if="place" class="bg-green-100 text-green-800 px-2 py-1 rounded">Ubicación: {{ place }}</span>
        </div>

        <a :href="link" target="_blank"
            class="inline-block mt-auto text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded transition">
            Ver Proyecto            
        </a>
        <slot />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Projects } from '../../../../interfaces/Content';

const props = defineProps<Projects>()

const formattedDate = computed(() =>
    new Date(props.date).toLocaleDateString('es-MX', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
)
</script>