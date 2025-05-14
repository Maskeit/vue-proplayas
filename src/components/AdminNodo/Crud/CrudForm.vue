<template>
    <div v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center text-gray-700 bg-black/50 backdrop-opacity-80"
        @click="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg  overflow-hidden h-auto max-h-[90vh] overflow-y-auto"
            @click.stop>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Nuevo Miembro</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 ">
                    ✕
                </button>
            </div>
            <form @submit.prevent="submitForm">
                <div class="space-y-4">
                    <div>
                        <label class="block font-medium">Nombre</label>
                        <input v-model="form.name" class="w-full p-2 border rounded-md field-sizing-content" required />
                    </div>

                    <div>
                        <label class="block font-medium">Email</label>
                        <input v-model="form.email" type="email" class="w-full p-2 border rounded-md" required />
                    </div>
                </div>
                <div class="flex justify-end mt-6">
                    <button @click="closeModal" class="px-4 py-2 border rounded-md mr-2">Cancelar</button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Invitar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { InviteNodeMember } from '@interfaces/Invitations';

interface FormData {
    name: string;
    email: string;
}

const props = defineProps<{ isOpen: boolean, invitation: InviteNodeMember | null }>();
const emit = defineEmits(["close", "guardar"]);

// Inicializamos el formulario con valores por defecto
const form = ref<FormData>({
    ...props.invitation,
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
function submitForm() {
    emit("guardar", form.value);
    closeModal();
}
</script>