<template>
    <h1 class="text-4xl mb-4 font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
        eBooks Compartidos
    </h1>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Libro v-for="book in parsedBooks" :key="book.id" v-bind="book" />
    </div>
</template>
<script setup lang="ts">
import Libro from '@/components/Public/Content/Cards/Libro.vue';
import books from '@/utils/json/books.json';
const parsedBooks = books.map(b => ({
    ...b,
    date: new Date(b.publication_date)
}));
</script>