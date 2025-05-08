<template>
    <div class="text-gray-600 dark:text-gray-100">
        <h1 class="text-2xl font-bold mb-4 ">Gestión de Proyectos Colaborativos</h1>
        <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600 shadow-md rounded-lg">
            <div>
                <label class="block text-sm font-medium ">Titulo del Proyecto</label>
                <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Descripción</label>
                <input v-model="formData.description" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Lugar</label>
                <input v-model="formData.place" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Link de Inscripción</label>
                <input v-model="formData.link" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Artículo</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Projects } from '@interfaces/Content';
import { useContentStore } from '@/services/Stores/ContentStore';
import Confirmation from '../modales/Confirmation.vue';


const formData = {
    title: '',
    description: '',
    date: '',
    place: '',
    image: '',
    link: '',
};

</script>