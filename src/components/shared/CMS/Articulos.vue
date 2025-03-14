<template>
    <div class="text-gray-600 dark:text-gray-100">
        <h1 class="text-2xl font-bold mb-4 ">Gestión de Artículos</h1>

        <!-- Formulario para crear/editar un Artículo -->
        <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-gray-600 shadow-md rounded-lg">
            <div>
                <label class="block text-sm font-medium ">Tipo</label>
                <input v-model="formData.type" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Título</label>
                <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Descripción</label>
                <textarea v-model="formData.description" class="mt-1 block w-full border rounded px-3 py-2 field-sizing-content"
                    required></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium ">Enlace</label>
                <input v-model="formData.links" type="url" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">DOI</label>
                <input v-model="formData.doi" type="text" class="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label class="block text-sm font-medium ">ISSN</label>
                <input v-model="formData.issn" type="text" class="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label class="block text-sm font-medium ">File Path</label>
                <input v-model="formData.file_path" type="text" class="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label class="block text-sm font-medium ">Cover Image</label>
                <input v-model="formData.cover_image" type="text" class="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Artículo</button>
            </div>
        </form>

        <!-- Lista de Artículos existentes -->
        <div>
            <h2 class="text-xl font-semibold mb-4">Artículos existentes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="pub in publications" :key="pub.id" class="border rounded p-4 shadow">
                    <h3 class="text-lg font-bold mb-2">{{ pub.title }}</h3>
                    <p class="text-sm  mb-1"><strong>Tipo:</strong> {{ pub.type }}</p>
                    <p class=" mb-2">{{ pub.description }}</p>
                    <p class="text-sm  mb-1"><strong>DOI:</strong> {{ pub.doi }}</p>
                    <p class="text-sm  mb-1"><strong>ISSN:</strong> {{ pub.issn }}</p>
                    <a :href="pub.links" class="text-blue-500 hover:underline" target="_blank">Ver Artículo</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Publications } from '@/interfaces/Publications';
// Importa los datos de prueba
import publicationsJson from '@/utils/json/articulos.json';

// Datos reactivos
const publications = ref<Publications[]>(publicationsJson);

// Datos del formulario basados en la interface Publications
const formData = ref<Publications>({
    id: 0,
    type: '',
    title: '',
    description: '',
    links: '',
    doi: '',
    issn: '',
    file_path: '',
    cover_image: '',
});

// Función para manejar el envío del formulario
function onSubmit() {
    const newPublication: Publications = {
        ...formData.value,
        id: Date.now(), // Simula un ID único
    };
    publications.value.push(newPublication);
    console.log("Artículo guardado:", newPublication);

    // Reinicia el formulario
    formData.value = {
        id: 0,
        type: '',
        title: '',
        description: '',
        links: '',
        doi: '',
        issn: '',
        file_path: '',
        cover_image: '',
    };
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si lo requieres */
</style>