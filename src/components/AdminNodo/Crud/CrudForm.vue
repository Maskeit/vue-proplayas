<template>
    <form @submit.prevent="onSubmit" class="space-y-4 ">
        <!-- Campo: Nombre -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" v-model="formData.name" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <!-- Campo: Linea de investigacion -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" v-model="formData.email" class="mt-1 block w-full border rounded px-3 py-2" required/>
        </div>

        <div class="flex justify-end space-x-2">
            <button type="button" class="px-4 py-2 border rounded" @click="$emit('cancelar')">
                Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
                Enviar Invitación
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Invitations } from '@interfaces/Invitations';
// Modal para invitar miembros
const props = defineProps<{
    model: Invitations | null;
}>();

const emits = defineEmits<{
    (e: 'guardar', data: Invitations): void;
    (e: 'cancelar'): void;
}>();

// Inicializamos el formulario con valores por defecto
const formData = ref<Invitations>({
    name: '',
    email: '',
});

function onSubmit() {
    emits('guardar', formData.value);
}
</script>