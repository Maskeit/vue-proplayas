<template>

    <!-- Modal de Edición -->
    <div v-if="visible"
        class="fixed inset-0 z-50 bg-black/50 backdrop-opacity-80 flex items-center justify-center">
        <div class="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 class="text-lg font-semibold mb-4">Editar Evento</h2>
            <form @submit.prevent="$emit('update')">
                <div>
                    <label class="block text-sm font-medium ">Título</label>
                    <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                        required />
                </div>
                <div>
                    <label class="block text-sm font-medium ">Descripción</label>
                    <textarea v-model="formData.description"
                        class="mt-1 block w-full border rounded px-3 py-2 field-sizing-content" required></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium ">Fecha del Evento</label>
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
                    <input v-model="formData.link" type="url" class="mt-1 block w-full border rounded px-3 py-2"
                        required />
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
                <div class="flex justify-end gap-4 mt-4">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Event } from '@interfaces/Content'

interface EventFormData extends Omit<Event, 'date'> {
  dateString: string;
  timeString: string;
}

const props = defineProps<{
  visible: boolean;
  formData: EventFormData;
}>();

const emit = defineEmits<{
  (e: 'update'): void;
  (e: 'close'): void;
}>();
</script>