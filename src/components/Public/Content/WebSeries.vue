<template>
    <div class="space-y-10 max-w-6xl mx-auto px-4 py-8">
        <div v-for="(serie, index) in series" :key="serie.id" class="space-y-2 relative">
            <h2 class="text-xl font-bold text-cyan-800 dark:text-zinc-300">{{ serie.title }}</h2>
            <p class="text-sm text-gray-600 dark:text-zinc-400">{{ serie.description }}</p>

            <!-- Carrusel horizontal con controles responsivos -->
            <div class="relative w-full max-w-full overflow-hidden">
              <!-- Botón Izquierdo -->
              <button
                class="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white/80 dark:bg-zinc-400/80 p-2 rounded-full shadow md:left-2"
                @click="scrollLeft(index)">
                ◀
              </button>

              <!-- Contenedor scroll -->
              <div class="relative w-full overflow-hidden">
                <div
                  :ref="el => setCarouselRef(el, index)"
                  class="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-8 py-5 scrollbar-hide snap-x snap-mandatory"
                >
                  <Webserie
                    v-for="chapter in serie.chapters"
                    :key="chapter.id"
                    v-bind="chapter"
                    class="flex-shrink-0 snap-start w-40 sm:w-44 md:w-48"
                  />
                </div>
              </div>

              <!-- Botón Derecho -->
              <button
                class="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white/80 dark:bg-zinc-400/80 p-2 rounded-full shadow md:right-2"
                @click="scrollRight(index)">
                ▶
              </button>
            </div>
        </div>

        <section>
            <h2 class="text-xl font-bold text-cyan-800 dark:text-zinc-300 mt-8 mb-4">Capítulos individuales</h2>
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Webserie v-for="cap in standaloneChapters" :key="cap.id" v-bind="cap" />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, ComponentPublicInstance } from 'vue'
import type { Series, Chapter } from '@/interfaces/Content'
import Webserie from '@/components/Public/Content/Cards/Webserie.vue';
import mockSeries from '@/utils/json/webseries.json'
import mockChapters from '@/utils/json/webchapters.json'

function extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([^\s&]+)/);
    return match ? match[1] : null;
}

const carousels = ref<(HTMLElement | null)[]>([])

// function setCarouselRef(el: HTMLElement | null, index: number) {
//     carousels.value[index] = el
// }
function setCarouselRef(el: Element | ComponentPublicInstance | null, index: number) {
  // Asegúrate de que es un HTMLElement
  if (el instanceof HTMLElement) {
    carousels.value[index] = el;
  } else {
    carousels.value[index] = null;
  }
}

function scrollLeft(index: number) {
    carousels.value[index]?.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollRight(index: number) {
    carousels.value[index]?.scrollBy({ left: 300, behavior: 'smooth' })
}

const series = ref<Series[]>(mockSeries.map(serie => ({
    ...serie,
    chapters: serie.chapters.map(ch => ({
        ...ch,
        thumbnail_url: ch.thumbnail_url || `https://img.youtube.com/vi/${extractYouTubeId(ch.youtube_url)}/hqdefault.jpg`
    }))
})))

const standaloneChapters = ref<Chapter[]>(mockChapters.map(ch => ({
    ...ch,
    thumbnail_url: ch.thumbnail_url || `https://img.youtube.com/vi/${extractYouTubeId(ch.youtube_url)}/hqdefault.jpg`
})))
</script>