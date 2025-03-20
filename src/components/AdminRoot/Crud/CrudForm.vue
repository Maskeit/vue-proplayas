<template>
    <h1 class="text-center text-xl font-bold">Invitar a liderar un nodo</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Campo: Code (select) y actualización automática del node_type -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Código</label>
            <select v-model="formData.code" @change="updateType" class="mt-1 block w-full border rounded px-3 py-2"
                required>
                <option disabled value="">Selecciona un código</option>
                <option value="A">A</option>
                <option value="E">E</option>
                <option value="C">C</option>
                <option value="F">F</option>
                <option value="I">I</option>
            </select>
        </div>
        <!-- Campo: node_type -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Tipo</label>
            <input node_type="text" v-model="formData.node_type" class="mt-1 block w-full border rounded px-3 py-2" readonly />
        </div>

        <!-- Campo: Nombre -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input node_type="text" v-model="formData.name" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>

        <!-- Campo: Correo -->
        <div>
            <div class="flex gap-2">
                <label class="block text-sm font-medium text-gray-700">Correo</label> <span class="text-sm text-gray-400">(Esta invitacion le llegara mediante correo electrónico)</span>
            </div>
            <input node_type="text" v-model="formData.email" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>

        <div class="flex justify-end space-x-2">
            <button node_type="button" class="px-4 py-2 border rounded" @click="$emit('cancelar')">
                Cancelar
            </button>
            <button node_type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
                Guardar
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { InviteNodeLeader } from '@interfaces/Invitations';

const props = defineProps<{
    model: InviteNodeLeader | null;
}>();


// Inicializamos el formulario con valores por defecto
const formData = ref<InviteNodeLeader>({
    node_type: '',
    code: '',
    name: '',
    email:'',
});

// Si se recibe un modelo para edición, inicializa el formulario con esos datos
watch(() => props.model, (newModel) => {
    if (newModel) {
        formData.value = { ...newModel, code:newModel.code[0] };
    } else {
        formData.value = {
            node_type: '',
            code: '',
            name: '',
            email: '',
        };
    }
}, { immediate: true });

// Función para actualizar automáticamente el campo node_type según el valor de code
function updateType() {
    switch (formData.value.code) {
        case 'A':
            formData.value.node_type = 'sociedad_civil';
            break;
        case 'E':
            formData.value.node_type = 'empresarial';
            break;
        case 'C':
            formData.value.node_type = 'cientifico';
            break;
        case 'F':
            formData.value.node_type = 'funcion_publica';
            break;
        case 'I':
            formData.value.node_type = 'individual';
            break;
        default:
            formData.value.node_type = '';
    }
}

const emits = defineEmits<{
    (e: 'guardar', data: InviteNodeLeader): void;
    (e: 'cancelar'): void;
}>();

function onSubmit() {
    emits('guardar', {
        name: formData.value.name,
        email: formData.value.email,
        node_type: formData.value.node_type
    });
}
</script>