<template>
    <div v-if="isOpen"
        class="fixed z-100 inset-0 flex items-center justify-center text-gray-700 bg-black/50 backdrop-opacity-80"
        @click="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg  overflow-hidden h-auto max-h-[90vh] overflow-y-auto"
            @click.stop>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Editar Foto de Perfil</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 ">
                    ✕
                </button>
            </div>
            <form @submit.prevent="submitForm">
                <div class="space-y-4">
                    <div>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="relative flex flex-col items-center justify-center w-full h-64 
                                border-2 border-gray-300 border-dashed rounded-lg cursor-pointer
                                bg-gray-50 dark:bg-gray-700
                                hover:bg-gray-100 dark:border-gray-600 
                                dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                :class="form.image ? 'border-0 bg-white dark:bg-gray-800' : ''"
                                @dragover.prevent @drop.prevent="handleDrop">
                                <!-- Si NO hay imagen, muestra dropzone con instrucciones -->
                                <div v-if="!form.image"
                                    class="flex flex-col items-center justify-center p-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
                                            A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5
                                            a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click para añadir una foto</span> o arrástrala y
                                        suéltala
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG o GIF (Max. 800×400px)
                                    </p>
                                </div>

                                <!-- Si hay imagen, muestra la vista previa -->
                                <div v-else class="relative flex flex-col items-center justify-center p-4">
                                    <img 
                                    :src="form.preview"
                                     alt="Preview"
                                        class="w-40 h-40 rounded-full object-cover border border-gray-200 shadow-sm" />
                                    <!-- Botón para remover la foto, opcional -->
                                    <button type="button" @click="removeImage"
                                        class="absolute top-2 right-2 bg-white bg-opacity-80 text-red-600 hover:text-red-800 rounded-full w-5 h-5 shadow">✕</button>
                                </div>

                                <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-6">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 border rounded-md mr-2">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";

interface FormData {
    image: File | null;
    preview: string | null;
}
const props = defineProps<{ 
    isOpen: boolean; nodeData: FormData 
}>();

const emit = defineEmits(["close", "uploadImg"]);

const form = ref<FormData>({
    image: null,
    preview: props.nodeData.image ? `http://localhost:8080/storage/uploads/profiles/${props.nodeData.image}` : null,
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
    form.value.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      form.value.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        form.value.image = file; // <--- guarda el archivo, no base64
        const reader = new FileReader();
        reader.onload = () => {
          form.value.preview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
};
const removeImage = () => {
    form.value.image = null;
    form.value.preview = null;
};
const submitForm = () => {
    if (form.value.image) {
        emit("uploadImg", form.value.image); // ahora es un File, no string
    }
    closeModal();
};
</script>