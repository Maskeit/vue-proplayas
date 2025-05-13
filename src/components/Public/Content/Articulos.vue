<template>
    <!-- panel de articles -->
    <h1 class="text-4xl mb-4 font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
        Publicaciones de la Red
    </h1>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Articulo v-for="project in parsedArticles" :key="project.id" v-bind="project" />
    </div>
</template>
<script setup lang="ts">
import Articulo from '@/components/Public/Content/Cards/Articulo.vue'
import articles from '@/utils/json/articulos.json'
const parsedArticles = articles.map(p => ({ ...p }));
</script>