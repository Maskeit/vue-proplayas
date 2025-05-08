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
                        <textarea v-model="form.about" class="w-full p-2 border rounded-md field-sizing-content" maxlength="250"></textarea>
                        <label class="text-sm font-extralight text-red-500">Máximo 250 caracteres.</label>
                    </div>
                    <div>
                        <label class="block font-medium">Nombre del nodo</label>
                        <input v-model="form.name" type="text" class="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="relative flex flex-col items-center justify-center w-full h-64 
                                border-2 border-gray-300 border-dashed rounded-lg cursor-pointer
                                bg-gray-50 dark:bg-gray-700
                                hover:bg-gray-100 dark:border-gray-600 
                                dark:hover:border-gray-500 dark:hover:bg-gray-600" 
                                :class="form.profile_picture ? 'border-0 bg-white dark:bg-gray-800' : ''" 
                                @dragover.prevent @drop.prevent="handleDrop">
                                <!-- Si NO hay imagen, muestra dropzone con instrucciones -->
                                <div v-if="!form.profile_picture" class="flex flex-col items-center justify-center p-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
                                            A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5
                                            a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click para añadir una foto</span> o arrástrala y suéltala
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG o GIF (Max. 800×400px)
                                    </p>
                                </div>

                                <!-- Si hay imagen, muestra la vista previa -->
                                <div v-else class="relative flex flex-col items-center justify-center p-4">
                                    <img :src="form.profile_picture" alt="Foto de perfil"
                                        class="w-40 h-40 rounded-full object-cover border border-gray-200 shadow-sm" />
                                    <!-- Botón para remover la foto, opcional -->
                                    <button type="button" @click="removeImage" class="absolute top-2 right-2 bg-white bg-opacity-80 text-red-600 hover:text-red-800 rounded-full w-5 h-5 shadow">✕</button>
                                </div>

                                <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
                            </label>
                        </div>
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { SocialLink } from "@/interfaces/Profile";

interface FormData {
    name: string;
    about: string;
    profile_picture: string | null;
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
const handleDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      form.value.profile_picture = reader.result as string;
    };
    reader.readAsDataURL(file);
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