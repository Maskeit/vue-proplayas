<template>
    <div class="relative bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 border border-gray-200 dark:border-none hover:shadow-lg transition cursor-pointer">
        <!-- Iconos de acciones -->
        <div class="absolute top-3 right-3 flex gap-2">
            <button @click.stop="$emit('edit')" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500 transition">
                <PencilIcon class="h-5 w-5" />
            </button>
            <button @click.stop="$emit('delete')" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500 transition">
                <TrashIcon class="h-5 w-5" />
            </button>
        </div>
        <h3 class="text-xl font-semibold text-cyan-800 dark:text-zinc-100 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-500 dark:text-zinc-300 mb-1">{{ formattedDate }}</p>
        <p v-if="props.author" class="text-sm text-gray-500 dark:text-zinc-300 italic">
            Autor: {{ props.author.name }}
        </p>

        <p class="text-gray-700 dark:text-zinc-200 mb-4 line-clamp-3">{{ description }}</p>

        <div class="flex flex-wrap text-sm text-gray-600 gap-3 mb-4">
            <span class="bg-blue-100 text-cyan-800 px-2 py-1 rounded">Formato: {{ format }}</span>
            <span v-if="location" class="bg-green-100 text-green-800 px-2 py-1 rounded">Ubicación: {{ location }}</span>
        </div>

        <a :href="link" target="_blank"
            class="inline-block mt-auto text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded transition">
            Ver Evento
        </a>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Events } from '../../../../interfaces/Content';
import { PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';
const props = defineProps<Events & { author?: any }>()

const formattedDate = computed(() => {
  const d = new Date(props.date);          // ej. 2025-04-30T13:00:00.000000Z
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',    // mié
    day:     '2-digit',  // 30
    month:   'short',    // abr
    year:    'numeric',  // 2025
    hour:    '2-digit',
    minute:  '2-digit',
    hour12:  true,
    timeZone: 'UTC',     // mostrar exactamente la hora guardada
  }).format(d) + ' UTC';
});
</script>