<template>
<div v-if="isOpen" class="fixed z-100 inset-0 flex items-center justify-center text-gray-700 bg-black/50 backdrop-opacity-80" @click="closeModal">
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
                        <label class="block font-medium">Nombre del nodo</label>
                        <input v-model="form.name" type="text" class="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label class="block font-medium">Sobre el Nodo</label>
                        <textarea v-model="form.about" class="w-full p-2 border rounded-md field-sizing-content" maxlength="250"></textarea>
                        <label class="text-sm font-extralight text-red-500">Máximo 250 caracteres.</label>
                    </div>
                    <div>
                        <label class="block font-medium">Redes Sociales</label>
                        <div v-for="(link, index) in form.social_media" :key="index" class="flex space-x-2 items-center mb-2">
                            <!-- Corrección: Mostrar select correctamente -->
                            <select v-model="form.social_media[index].platform" class="w-1/2 p-2 border rounded-md ">
                                <option v-for="option in availableSocialPlatforms" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                            <input v-model="form.social_media[index].url" placeholder="URL" class="w-1/2 p-2 border rounded-md " />
                            <button @click.prevent="removeSocialMedia(index)" class="text-red-500 hover:text-red-700">✕</button>
                        </div>
                        <button @click.prevent="addSocialMedia" class="mt-2 text-blue-500 hover:underline">+ Agregar</button>
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
storage/app/public/uploads/profiles/a30630b6-881f-40fb-b7e6-dad419622dbc.webp
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { SocialLink } from "@interfaces/Profile";

interface FormData {
    name: string;
    about: string;    
    social_media: SocialLink[];
}

const props = defineProps<{ isOpen: boolean; nodeData: FormData }>();
const emit = defineEmits(["close", "update"]);

const form = ref<FormData>({
    ...props.nodeData,
    social_media: props.nodeData.social_media,
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

const submitForm = () => {
    emit("update", form.value);
    closeModal();
};

const addSocialMedia = () => {
    if (!form.value.social_media) {
        form.value.social_media = [];
    }
    const usedPlatforms = form.value.social_media.map(link => link.platform);
    const nextAvailable = availableSocialPlatforms.value.find(
        option => !usedPlatforms.includes(option.value as SocialLink["platform"])
    );
    if (nextAvailable) {
        form.value.social_media.push({ platform: nextAvailable.value as SocialLink["platform"], url: "" });
    }
};
const removeSocialMedia = (index: number) => {
    form.value.social_media.splice(index, 1);
};


</script>