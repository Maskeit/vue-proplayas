<template>
  <div class="text-gray-600 dark:text-gray-100">
    <h1 class="text-2xl font-bold mb-4">Gestión de Webinars</h1>

    <!-- Formulario para crear un Webinar -->
    <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600 shadow-md rounded-lg">
      <div>
        <label class="block text-sm font-medium ">Título</label>
        <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium ">Descripción</label>
        <textarea v-model="formData.description" class="mt-1 block w-full border rounded px-3 py-2 field-sizing-content" required></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium ">Fecha</label>
        <!-- Usamos un campo de tipo date y almacenamos el valor en dateString -->
        <input v-model="formData.dateString" type="date" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium ">Enlace</label>
        <input v-model="formData.link" type="url" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium ">Formato del webinar</label>
        <input v-model="formData.format" type="url" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium ">Lugar</label>
        <input v-model="formData.location" type="url" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <!-- Puedes agregar más campos (organizer_type, organizer_id, format, location) según necesites -->
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Webinar</button>
      </div>
    </form>

    <!-- Lista de Webinars existentes -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Webinars existentes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="webinar in webinars" :key="webinar.id" class="border rounded p-4 shadow">
          <h3 class="text-lg font-bold mb-2">{{ webinar.title }}</h3>
          <p class="text-sm  mb-1">{{ formatDate(webinar.date) }}</p>
          <p class=" mb-2">{{ webinar.description }}</p>
          <a :href="webinar.link" class="text-blue-500 hover:underline" target="_blank">Ver Webinar</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Webinars } from '@/interfaces/Webinars';
import webinarsJson from '@/utils/json/webinars.json'
// Debido a que el input type="date" trabaja con string, definimos un tipo auxiliar para el formulario
interface WebinarFormData extends Omit<Webinars, 'date'> {
  dateString: string;
}

// Lista reactiva de webinars (puedes cargar datos desde un JSON o un endpoint real)
const webinars = ref<Webinars[]>(webinarsJson);

// Datos del formulario con valores iniciales vacíos
const formData = ref<WebinarFormData>({
  id: 0,
  title: '',
  description: '',
  organizer_type: '',
  organizer_id: 0,
  link: '',
  format: '',
  location: null,
  dateString: '',
});

// Función para formatear la fecha a una cadena legible
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString();
}

// Función para manejar el envío del formulario
function onSubmit() {
  // Convertir la fecha en formato string a Date
  const newWebinar: Webinars = {
    ...formData.value,
    id: Date.now(), // Simulación de id único
    date: new Date(formData.value.dateString),
  };
  // Agregar el nuevo webinar a la lista
  webinars.value.push(newWebinar);
  console.log("Webinar guardado:", newWebinar);

  // Limpiar el formulario
  formData.value = {
    id: 0,
    title: '',
    description: '',
    organizer_type: '',
    organizer_id: 0,
    link: '',
    format: '',
    location: null,
    dateString: '',
  };
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí */
</style>