<template>
    <h1 class="text-center text-xl font-bold">Invitar a un miembro a mi nodo</h1>
    <form @submit.prevent="onSubmit" class="space-y-4 ">
        <!-- Campo: Nombre -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" v-model="formData.name" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <!-- Campo: Linea de investigacion -->
        <div>
            <div class="flex gap-2">
                <label class="block text-sm font-medium text-gray-700">Correo</label> <span class="text-sm text-gray-400">(Esta invitacion le llegara mediante correo electrónico)</span>
            </div>
            <input node_type="text" v-model="formData.email" class="mt-1 block w-full border rounded px-3 py-2" required />
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
import type { InviteNodeMember } from '@interfaces/Invitations';
// Modal para invitar miembros
const props = defineProps<{
    model: InviteNodeMember | null;
}>();

// Inicializamos el formulario con valores por defecto
const formData = ref<InviteNodeMember>({
    name: '',
    email: '',
});

const emits = defineEmits<{
    (e: 'guardar', data: Invitations): void;
    (e: 'cancelar'): void;
}>();

function onSubmit() {
    emits('guardar', {
        name: formData.value.name,
        email: formData.value.email,
    });
}
</script>