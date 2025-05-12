<template>
    <div v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center text-gray-700 bg-black/50 backdrop-opacity-80"
        @click="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg  overflow-hidden h-auto max-h-[90vh] overflow-y-auto"
            @click.stop>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Nuevo Nodo</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 ">
                    ✕
                </button>
            </div>
            <form @submit.prevent="submitForm" class="space-y-4">
                <!-- Campo: Code (select) y actualización automática del node_type -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Código</label>
                    <select v-model="form.code" @change="updateType" class="mt-1 block w-full border rounded px-3 py-2"
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
                    <input node_type="text" v-model="form.node_type" class="mt-1 block w-full border rounded px-3 py-2"
                        readonly />
                </div>

                <!-- Campo: Nombre -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input node_type="text" v-model="form.name" class="mt-1 block w-full border rounded px-3 py-2"
                        required />
                </div>

                <!-- Campo: Correo -->
                <div>
                    <div class="flex gap-2">
                        <label class="block text-sm font-medium text-gray-700">Correo</label> <span
                            class="text-sm text-gray-400">(Esta invitacion le llegara mediante correo
                            electrónico)</span>
                    </div>
                    <input node_type="text" v-model="form.email" class="mt-1 block w-full border rounded px-3 py-2"
                        required />
                </div>

                <div class="flex justify-end space-x-2">
                    <button @click="closeModal" class="px-4 py-2 border rounded-md mr-2">Cancelar</button>
                    <button node_type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
                        Invitar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { InviteNodeLeader } from '@interfaces/Invitations';

interface FormData {
    name: string;
    email: string;
    node_type: string;
    code: string;
}
const props = defineProps<{ isOpen: boolean, invitation: InviteNodeLeader | null }>();
const emit = defineEmits(["close", "guardar"]);


// Inicializamos el formulario con valores por defecto
const form = ref<FormData>({
    ...props.invitation,
    code: '',
});

const closeModal = () => emit("close");
onMounted(() => {
    window.addEventListener("keydown", closeOnEscape);
});
onUnmounted(() => {
    window.removeEventListener("keydown", closeOnEscape);
});
const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        closeModal();
    }
};


// Función para actualizar automáticamente el campo node_type según el valor de code
function updateType() {
    switch (form.value.code) {
        case 'A':
            form.value.node_type = 'sociedad_civil';
            break;
        case 'E':
            form.value.node_type = 'empresarial';
            break;
        case 'C':
            form.value.node_type = 'cientifico';
            break;
        case 'F':
            form.value.node_type = 'funcion_publica';
            break;
        case 'I':
            form.value.node_type = 'individual';
            break;
        default:
            form.value.node_type = '';
    }
}


function submitForm() {
    emit("guardar", form.value);
    console.log("Formulario enviado:", form.value);
    closeModal();
}

</script>