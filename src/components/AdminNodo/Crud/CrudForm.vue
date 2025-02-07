<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Campo: Nombre -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" v-model="formData.name" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <!-- Campo: Linea de investigacion -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Linea de investigación</label>
            <input type="text" v-model="formData.research_line" class="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <!-- Campo: area de trabajo -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Área de trabajo</label>
            <input type="number" v-model.number="formData.work_area"
                class="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <!-- Agregar más campos según la entidad, por ejemplo:
           members_count, leader_name, email, password, website, activity_level, memorandum, etc. -->

        <div class="flex justify-end space-x-2">
            <button type="button" class="px-4 py-2 border rounded" @click="$emit('cancelar')">
                Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
                Guardar
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Members } from '@/interfaces/Members';

const props = defineProps<{
    model: Members | null;
}>();

const emits = defineEmits<{
    (e: 'guardar', data: Members): void;
    (e: 'cancelar'): void;
}>();

// Inicializamos el formulario con valores por defecto
const formData = ref<Members>({
    name: '',
    research_line: '',
    work_area: '',
});

// Si se recibe un modelo para edición, inicializa el formulario con esos datos
watch(() => props.model, (newModel) => {
    formData.value = {
        name: '',
        research_line: '',
        work_area: '',
    };
}, { immediate: true });

function onSubmit() {
    emits('guardar', formData.value);
}
</script>