<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center text-gray-700 bg-black/50 backdrop-opacity-80" @click="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-hidden h-auto max-h-[90vh] overflow-y-auto"@click.stop>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Editar Perfil</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 ">
                    ✕
                </button>
            </div>

            <form @submit.prevent="submitForm">
                <div class="space-y-4">
                    <div>
                        <label class="block font-medium">Nombre</label>
                        <input v-model="form.name" type="text"
                            class="w-full p-2 border rounded-md" />
                    </div>

                    <div>
                        <label class="block font-medium">Foto de Perfil</label>
                        <input type="file" @change="handleFileUpload"
                            class="w-full p-2 border rounded-md" />
                        <div v-if="form.profile_picture" class="mt-2">
                            <img :src="form.profile_picture" alt="Foto de perfil"
                                class="w-20 h-20 rounded-full object-cover" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <button @click="closeModal" class="px-4 py-2 border rounded-md mr-2">Cancelar</button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface UserProfile {
    name: string;
    profile_picture: string | null;
}

const props = defineProps<{ isOpen: boolean; userData: UserProfile }>();
const emit = defineEmits(["close", "update"]);

const form = ref<UserProfile>({ ...props.userData });

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
const submitForm = () => {
    emit("update", form.value);
    closeModal();
};

const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            form.value.profile_picture = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
};
</script>