<template>
    <div class="text-gray-600 dark:text-gray-100">
        <h1 class="text-2xl font-bold mb-4">Gestión de Libros</h1>

        <!-- Formulario para crear/editar un Libro -->
        <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600 shadow-md rounded-lg">
            <div>
                <label class="block text-sm font-medium ">Título</label>
                <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium">Autor</label>
                <input v-model="formData.author" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="Nombre del autor" />
            </div>
            <div>
                <label class="block text-sm font-medium">Fecha de Publicación</label>
                <!-- Se usa un input type="date" y se almacena en publicationDateString -->
                <input v-model="formData.publicationDateString" type="date"
                    class="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label class="block text-sm font-medium">ISBN</label>
                <input v-model="formData.isbn" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="Número ISBN" />
            </div>
            <div>
                <label class="block text-sm font-medium">Descripción</label>
                <textarea v-model="formData.description" class="mt-1 block w-full border rounded px-3 py-2 field-sizing-content"
                    placeholder="Descripción del libro"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium">Enlace</label>
                <input v-model="formData.link" type="url" class="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="Enlace al libro" />
            </div>
            <!-- Puedes agregar más campos como file_path o cover_image si lo requieres -->
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Libro</button>
            </div>
        </form>

        <!-- Lista de Libros existentes -->
        <div>
            <h2 class="text-xl font-semibold mb-4">Libros existentes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="book in books" :key="book.id" class="border rounded p-4 shadow">
                    <h3 class="text-lg font-bold mb-2">{{ book.title }}</h3>
                    <p class="text-sm  mb-1">
                        {{ book.author ? book.author : 'Autor desconocido' }}
                    </p>
                    <p class="text-sm  mb-1">{{ formatDate(book.publication_date) }}</p>
                    <p class="mb-2">{{ book.description }}</p>
                    <a v-if="book.link" :href="book.link" class="text-blue-500 hover:underline" target="_blank">Ver
                        Libro</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Books } from '@/interfaces/Books';
import booksJson from '@/utils/json/books.json';
// Creamos un tipo auxiliar para el formulario que convierte publication_date a string
interface BookFormData extends Omit<Books, 'publication_date'> {
    publicationDateString: string;
}

// Lista reactiva de libros; opcionalmente, se pueden cargar datos desde un JSON
const books = ref<Books[]>(booksJson);

// Datos del formulario con valores iniciales (en este ejemplo, se parte de un formulario vacío)
const formData = ref<BookFormData>({
    id: 0,
    title: '',
    author: null,
    publication_date: null,
    isbn: null,
    description: null,
    link: null,
    file_path: null,
    cover_image: null,
    publicationDateString: '',
});

// Función para formatear la fecha a un formato legible
function formatDate(date: Date | null): string {
    if (!date) return 'Fecha no disponible';
    return new Date(date).toLocaleDateString();
}

// Manejo del envío del formulario
function onSubmit() {
    // Convierte publicationDateString a objeto Date si se ingresó valor
    const newBook: Books = {
        ...formData.value,
        id: Date.now(), // Simulación de un id único
        publication_date: formData.value.publicationDateString ? new Date(formData.value.publicationDateString) : null,
    };
    // Agrega el nuevo libro a la lista
    books.value.push(newBook);
    console.log("Libro guardado:", newBook);

    // Limpia el formulario
    formData.value = {
        id: 0,
        title: '',
        author: null,
        publication_date: null,
        isbn: null,
        description: null,
        link: null,
        file_path: null,
        cover_image: null,
        publicationDateString: '',
    };
}
</script>

<style scoped>
/* Agrega estilos adicionales si lo requieres */
</style>