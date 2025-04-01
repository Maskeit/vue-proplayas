<template>
    <div class="text-gray-600 dark:text-gray-100">
        <h1 class="text-2xl font-bold mb-4">Gestión de WebSeries</h1>

        <!-- Formulario para crear/editar una WebSeries -->
        <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600  shadow-md rounded-lg">
            <div>
                <label class="block text-sm font-medium ">Título</label>
                <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Código Iframe</label>
                <textarea v-model="formData.iframe_code" class="mt-1 block w-full border rounded px-3 py-2"
                    required></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium ">Tipo de Organizador</label>
                <input v-model="formData.organizer_type" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">ID del Organizador</label>
                <input v-model.number="formData.organizer_id" type="number"
                    class="mt-1 block w-full border rounded px-3 py-2" required />
            </div>
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
                    Guardar WebSeries
                </button>
            </div>
        </form>

        <!-- Lista de WebSeries existentes -->
        <div>
            <h2 class="text-xl font-semibold mb-4">WebSeries existentes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="serie in seriesList" :key="serie.id" class="border rounded p-4 shadow">
                    <h3 class="text-lg font-bold mb-2">{{ serie.title }}</h3>
                    <!-- Se usa v-html para renderizar el código iframe -->
                    <div class="mb-2" v-html="serie.iframe_code"></div>
                    <p class="text-sm ">
                        Organizador: {{ serie.organizer_type }} (ID: {{ serie.organizer_id }})
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Series } from '@/interfaces/Series';
// Importa el archivo JSON de datos de prueba
import seriesJson from '@/utils/json/series.json';

// Los datos del formulario se basan en la interface Series
const formData = ref<Series>({
    id: 0,
    title: '',
    iframe_code: '',
    organizer_type: '',
    organizer_id: 0,
});

// Lista reactiva de WebSeries, inicializada con datos de prueba
const seriesList = ref<Series[]>(seriesJson);

// Función para manejar el envío del formulario
function onSubmit() {
    const newSeries: Series = {
        ...formData.value,
        id: Date.now(), // Simula un id único
    };
    seriesList.value.push(newSeries);
    console.log('WebSeries guardada:', newSeries);

    // Limpia el formulario
    formData.value = {
        id: 0,
        title: '',
        iframe_code: '',
        organizer_type: '',
        organizer_id: 0,
    };
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales si es necesario */
</style>