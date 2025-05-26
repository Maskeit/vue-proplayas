<template>
    <form v-if="formData" @submit.prevent="emit('submit', 'event')"
        class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600 shadow-md rounded-lg">
        <div>
            <label class="block text-sm font-medium ">Título</label>
            <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
            <label class="block text-sm font-medium ">Descripción</label>
            <textarea v-model="formData.description"
                class="mt-1 block w-full border rounded px-3 py-2 field-sizing-content" required></textarea>
        </div>
        <div>
            <label class="block text-sm font-medium ">Tipo de evento</label>
            <select v-model="formData.type" class="mt-1 block w-full border rounded px-3 py-2" required>
                <option value="" disabled>Selecciona un tipo de evento</option>
                <option value="webinar">Webinar</option>
                <option value="congreso">Congreso</option>
                <option value="magistrado">Magistrado</option>
                <option value="clase">Clase</option>
                <option value="taller">Taller</option>
                <option value="charla">Charla</option>
                <option value="conferencia">Conferencia</option>
                <option value="otro">Otro</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium ">Fecha del Evento</label>
            <!-- Usamos un campo de tipo date y almacenamos el valor en dateString -->
            <input v-model="formData.dateString" type="date" class="mt-1 block w-full border rounded px-3 py-2"
                required />
        </div>
        <div>
            <label class="block text-sm font-medium">Hora del Evento</label>
            <input v-model="formData.timeString" type="time" class="mt-1 block w-full border rounded px-3 py-2"
                required />
        </div>
        <div>
            <label class="block text-sm font-medium ">Enlace al evento o de registro</label>
            <input v-model="formData.link" type="url" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
            <label class="block text-sm font-medium">Modalidad del Evento</label>
            <select v-model="formData.format" class="mt-1 block w-full border rounded px-3 py-2" required>
                <option value="" disabled>Selecciona un formato</option>
                <option value="online">Online</option>
                <option value="presencial">Presencial</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium ">Lugar donde se llevará a cabo el evento</label>
            <input v-model="formData.location" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                required />
        </div>

        <div class="relative w-full h-48 bg-gray-200 rounded mb-4 overflow-hidden group">
            <img v-if="coverImagePreview" :src="coverImagePreview" alt="Miniatura del evento"
                class="w-full h-full object-cover" />

            <button v-if="coverImagePreview" @click="removeFileFromFormData('cover_image_file')"
                class="absolute top-2 right-2 bg-white bg-opacity-80 p-1 rounded hover:bg-opacity-100">
                <TrashIcon class="w-5 h-5 text-red-500" />
            </button>

            <label v-else
                class="w-full h-full flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-300 transition">
                <PhotoIcon class="w-8 h-8" />
                <span class="text-sm">Agregar Portada</span>
                <input type="file" accept="image/*" @change="(e) => handleImageUpload(e, 'cover_image_file')" ref="fileInput"
                    class="hidden" />
            </label>

            <button v-if="coverImagePreview"
                class="absolute bottom-2 right-2 bg-white bg-opacity-70 p-1 rounded hover:bg-opacity-100"
                @click="fileInput?.click()">
                <PhotoIcon class="w-5 h-5 text-gray-700" />
            </button>
        </div>

        <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Evento</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { TrashIcon, PhotoIcon } from '@heroicons/vue/24/solid';
import { usePanelUtilities } from '../Composables/panelMethods';

import type { EventFormData } from '@interfaces/forms';

const props = defineProps<{ formData: any }>();

const formData = props.formData;

const emit = defineEmits<{
    (e: 'submit', contentType: string): void;
}>();

// Integración para carga de imágenes y vista previa
const fileInput = ref<HTMLInputElement | null>(null);
const coverImagePreview = ref<string>('');

const { handleImageUpload, removeFileFromFormData } = usePanelUtilities({
    formData: props.formData,
    selectedItem: ref(null),
    confirmation: ref({ isOpen: false, message: '', type: 'success' }),
    fileInputRef: fileInput,
    coverImagePreview,
});

watch(
    () => props.formData.cover_image_file,
    (val) => {
        coverImagePreview.value = val || '';
    },
    { immediate: true }
);
</script>