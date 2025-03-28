<template>
    <a :href="youtube_url" target="_blank" class="block w-48 flex-shrink-0">
        <div class="rounded overflow-hidden shadow hover:shadow-lg transition">
            <img :src="thumbnail_url" alt="thumbnail" class="w-full h-28 object-cover" />
            <div class="bg-white p-2">
                <h3 class="text-sm font-semibold text-gray-800 truncate">{{ title }}</h3>
                <p class="text-xs text-gray-500 truncate">{{ description }}</p>
                <p v-if="episode_number" class="text-xs text-cyan-600 mt-1">Ep. {{ episode_number }}</p>
            </div>
        </div>
    </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
    title: string
    description: string
    youtube_url: string
    thumbnail_url: string
    episode_number?: number
}>()
</script>