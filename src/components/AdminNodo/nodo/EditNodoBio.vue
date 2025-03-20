<template>
<div v-if="isOpen" class="fixed inset-0 flex items-center justify-center text-gray-700 bg-black/50 backdrop-opacity-80" @click="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg  overflow-hidden h-auto max-h-[90vh] overflow-y-auto" @click.stop>    
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Editar Nodo</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 ">
                    ✕
                </button>
            </div>
            <form @submit.prevent="submitForm">
                <div class="space-y-4">
                    <div>
                        <label class="block font-medium">Sobre el Nodo</label>
                        <textarea v-model="form.about" class="w-full p-2 border rounded-md field-sizing-content"></textarea>
                    </div>

                    <div>
                        <label class="block font-medium">Nombre del nodo</label>
                        <input v-model="form.name" type="text" class="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label class="block font-medium">Foto de Perfil</label>
                        <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded-md" />
                        <div v-if="form.profile_picture" class="mt-2">
                            <img :src="form.profile_picture" alt="Foto de perfil"
                                class="w-20 h-20 rounded-full object-cover" />
                        </div>
                    </div>
                    <div>
                        <label class="block font-medium">Redes Sociales</label>
                        <div v-for="(link, index) in form.social_media" :key="index"
                            class="flex space-x-2 items-center mb-2">
                            <!-- Corrección: Mostrar select correctamente -->
                            <select v-model="form.social_media[index].platform" class="w-1/2 p-2 border rounded-md ">
                                <option v-for="option in availableSocialPlatforms" :key="option.value"
                                    :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                            <input v-model="form.social_media[index].url" placeholder="URL"
                                class="w-1/2 p-2 border rounded-md " />
                            <button @click.prevent="removeSocialMedia(index)"
                                class="text-red-500 hover:text-red-700">✕</button>
                        </div>
                        <button @click.prevent="addSocialMedia" class="mt-2 text-blue-500 hover:underline">+
                            Agregar</button>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { SocialLink } from "@/interfaces/profile";

interface FormData {
    name: string;
    about: string;
    profile_picture: string;
    social_media: SocialLink[];
}

const props = defineProps<{ isOpen: boolean; nodeData: FormData }>();
const emit = defineEmits(["close", "update"]);

const form = ref<FormData>({
    name: props.nodeData.name || "",
    about: props.nodeData.about || "",
    profile_picture: props.nodeData.profile_picture || "",
    social_media: props.nodeData.social_media ?? [] // Asegurar que sea un array vacío si no existe
});
// Redes sociales disponibles
const availableSocialPlatforms = computed(() => [
    { value: "linkedin", label: "LinkedIn" },
    { value: "github", label: "GitHub" },
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "research_gate", label: "ResearchGate" },
    { value: "website", label: "Sitio Web" } // Se agregó website correctamente
]);

const closeModal = () => emit("close");

const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        closeModal();
    }
};

onMounted(() => {
    window.addEventListener("keydown", closeOnEscape);
});
onUnmounted(() => {
    window.removeEventListener("keydown", closeOnEscape);
});
const submitForm = () => {
    emit("update", form.value);
    closeModal();
};

const addSocialMedia = () => {
    form.value.social_media.push({ platform: "website", url: "" });
};

const removeSocialMedia = (index: number) => {
    form.value.social_media.splice(index, 1);
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