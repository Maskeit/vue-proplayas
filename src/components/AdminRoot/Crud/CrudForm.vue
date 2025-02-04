<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Campo: Code (select) y actualización automática del type -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Código</label>
            <select v-model="formData.code" @change="updateType" class="mt-1 block w-full border rounded px-3 py-2"
                required>
                <option disabled value="">Selecciona un código</option>
                <option value="A">A</option>
                <option value="E">E</option>
                <option value="C">C</option>
                <option value="F">F</option>
            </select>
        </div>
        <!-- Campo: Type -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Tipo</label>
            <input type="text" v-model="formData.type" class="mt-1 block w-full border rounded px-3 py-2" readonly />
        </div>

        <!-- Campo: Nombre -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" v-model="formData.name" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>

        <!-- Campo: País -->
        <div>
            <label class="block text-sm font-medium text-gray-700">País</label>
            <input type="text" v-model="formData.country" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>

        <!-- Campo: Ciudad -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Ciudad</label>
            <input type="text" v-model="formData.city" class="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <!-- Campo: Año de ingreso (joined_in) -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Año de Ingreso</label>
            <input type="number" v-model.number="formData.joined_in"
                class="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <!-- Puedes agregar más campos según la entidad, por ejemplo:
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
import type { Nodes } from '@/interfaces/Nodes';

const props = defineProps<{
    model: Nodes | null;
}>();

const emits = defineEmits<{
    (e: 'guardar', data: Nodes): void;
    (e: 'cancelar'): void;
}>();

// Inicializamos el formulario con valores por defecto
const formData = ref<Nodes>({
    id: '',
    type: '',
    code: '',
    name: '',
    country: '',
    city: '',
    joined_in: 0,
    members_count: 0,
    leader_name: '',
    email: '',
    password: '',
    website: '',
    activity_level: '',
    memorandum: ''
});

// Si se recibe un modelo para edición, inicializa el formulario con esos datos
watch(() => props.model, (newModel) => {
    if (newModel) {
        formData.value = { ...newModel, code:newModel.code[0] };
    } else {
        formData.value = {
            id: '',
            type: '',
            code: '',
            name: '',
            country: '',
            city: '',
            joined_in: 0,
            members_count: 0,
            leader_name: '',
            email: '',
            password: '',
            website: '',
            activity_level: '',
            memorandum: ''
        };
    }
}, { immediate: true });

// Función para actualizar automáticamente el campo type según el valor de code
function updateType() {
    switch (formData.value.code) {
        case 'A':
            formData.value.type = 'ACTIVISTA/SOC CIVIL';
            break;
        case 'E':
            formData.value.type = 'EMPRESARIAL';
            break;
        case 'C':
            formData.value.type = 'CIENTIFICO';
            break;
        case 'F':
            formData.value.type = 'FUNCION PUBLICA';
            break;
        default:
            formData.value.type = '';
    }
}

function onSubmit() {
    emits('guardar', formData.value);
}
</script>