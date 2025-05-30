<template>
    <h1 class="text-4xl mb-4 font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
        eBooks Compartidos
    </h1>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Libro v-for="book in books" :key="book.id" v-bind="book" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Libro from '@/components/Public/Content/Cards/Libro.vue';
import { useContentStore } from '@/services/Stores/ContentStore';

// estados
const contentStore = useContentStore();
const books = computed(() => contentStore.contentMap['books']);
const isLoading = ref(true);
onMounted(async () => {
    isLoading.value = true;
    await contentStore.fetchContent("books");
    isLoading.value = false;
});
</script>