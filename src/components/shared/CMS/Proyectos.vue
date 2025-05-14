<template>
    <div class="text-gray-600 dark:text-gray-100">
        <h1 class="text-2xl font-bold mb-4 ">Gestión de Proyectos Colaborativos</h1>
        <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600 shadow-md rounded-lg">
            <div>
                <label class="block text-sm font-medium ">Titulo del Proyecto</label>
                <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Descripción</label>
                <input v-model="formData.description" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Lugar</label>
                <input v-model="formData.location" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium ">Publicación o productos (Link de acceso)</label>
                <input v-model="formData.link" type="text" class="mt-1 block w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium">Portada del proyecto</label>
                <input ref="coverInputRef" type="file" @change="handleCoverImageUpload" accept="image/*"
                    class="mt-1 block w-full border rounded px-3 py-2" />
                <div v-if="formData.cover_image" class="mt-2 relative w-48">
                    <img :src="formData.cover_image" alt="Portada del Proyecto" class="rounded border w-full h-auto" />
                    <button @click="removeCoverImage" type="button"
                        class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs">✕</button>
                </div>
            </div>
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Artículo</button>
            </div>
        </form>

        <!-- Lista de Proyectos existentes -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Tus Proyectos</h2>
            <div v-if="!isLoading && projects.length > 0">
                <!-- panel de Proyectos -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProyectoCard v-for="project in projects" :key="project.id" v-bind="project" @edit="openEditModal(project)"
                        @delete="deleteProject(project)" />
                </div>
            </div>
            <div v-else>
                <p>Cargando Proyectos...</p>
            </div>
            <EditProyecto :visible="isEditModalOpen" :formData="formData" @close="closeEditModal" @update="onUpdate" />
        </div>
        <Confirmation v-if="confirmation.isOpen" :message="confirmation.message" :type="confirmation.type"
            @close="confirmation.isOpen = false" @confirm="confirmDelete" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Project } from '@interfaces/Content';
import ProyectoCard from './Cards/ProyectoCard.vue'; // faltan de configurar
import EditProyecto from './Modals/EditProyecto.vue'; // faltan de configurar
import { useCrud } from '@/components/shared/CMS/Composables/useCrud';
import { useProjectsCrud } from '@/services/Adapters/useAdapterCrud';

import Confirmation from '../modales/Confirmation.vue';
import { buildDateTimeMySQL } from '@/utils/validators/dateUtils';
import { useForm } from '@/components/shared/CMS/Composables/useForm';
import { EMPTY_PROJECT_FORM, type ProjectFormData } from '@interfaces/forms';

// estados
const { data: formData, reset, patch } = useForm<ProjectFormData>(EMPTY_PROJECT_FORM);

// CRUD genérico para Proyectos
const {
    items: projects,
    isLoading,
    fetchAll,
    create,
    update,
    remove,
} = useCrud<Project>(useProjectsCrud());

const confirmation = ref({
    isOpen: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
});
onMounted(fetchAll);
const selectedProject = ref<Project | null>(null);
const isEditModalOpen = ref(false);

const openEditModal = (project: Project) => {
  selectedProject.value = project;

  // ── Extraer dateString y timeString con seguridad ──
  let dateString = '';
  let timeString = '';

  if (project.date) {
    const iso = project.date
      .replace(' ', 'T')  // MySQL -> ISO
      .replace('Z', '')   // elimina Z si viene
      .slice(0, 16);      // YYYY-MM-DDTHH:mm

    const [dPart, tPart] = iso.split('T');
    dateString = dPart;
    const [hh, mm] = (tPart ?? '').split(':');
    if (hh && mm) timeString = `${hh}:${mm}`;
  }

  // Mezclamos el objeto parcial en formData sin perder reactividad
  patch({
    ...project,
    dateString,
    timeString,
    cover_image: project.cover_image ?? '',
  });

  isEditModalOpen.value = true;
};
function closeEditModal() {
  isEditModalOpen.value = false;
  selectedProject.value = null;
}
// funcion para manejra el envio del formulario
const onSubmit = async () => {
    // aqui tambien usare la fecha
    const newProject: Project = {
        ...formData.value,
        id: Date.now(),
        date: buildDateTimeMySQL(formData.value.dateString, formData.value.timeString),
    } as unknown as Project;
    try {
        await create(newProject);
        showConfirmation(`projecto creado con éxito.`, 'success');
    } catch (err) {
        showConfirmation('Error al crear el projecto.', 'error');
        console.error("Error al crear projecto", err);
    }

    reset();
};
// Función para actualizar un projecto existente
const onUpdate = async() => {
  if (!selectedProject.value) return;
  const updatedProject: Project = {
    ...formData.value,
    //id: selectedProject.value.id,
    date: buildDateTimeMySQL(formData.value.dateString, formData.value.timeString),
  } as unknown as Project;

  try {
    await update(updatedProject,selectedProject.value.id,);
    closeEditModal();
    showConfirmation(`Proyecto actualizado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al actualizar el Proyecto.', 'error');
    console.error("Error al actualizar Proyecto", err);
  }
}
// Función para confirmar la eliminación de un proyecto 
const confirmDelete = async () => {
  if (!selectedProject.value) return;
  try {
    await remove(selectedProject.value.id);
    showConfirmation(`Proyecto eliminado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al eliminar el proyecto.', 'error');
  } finally {
    selectedProject.value = null;
  }
}
const handleCoverImageUpload = (project: Project) => {
    const target = project.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showConfirmation('Solo se permiten imágenes JPG, PNG o WEBP.', 'error');
            if (coverInputRef.value) {
                coverInputRef.value.value = '';
            }
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            formData.value.cover_image = reader.result as string;
        };
        reader.readAsDataURL(file); // convierte a base64 para previsualizar o enviar
    }
}
const coverInputRef = ref<HTMLInputElement | null>(null);
const removeCoverImage = () => {
    formData.value.cover_image = '';
    if (coverInputRef.value) {
        coverInputRef.value.value = '';
    }
}
// Función para mostrar la confirmación
const showConfirmation = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
  confirmation.value.message = message;
  confirmation.value.type = type;
  confirmation.value.isOpen = true;
}
const deleteProject = (project: { id: number; title: string }) => {
  selectedProject.value = project;
  confirmation.value = {
    isOpen: true,
    message: `¿Estás seguro de que deseas eliminar el projecto "${project.title}"?`,
    type: 'warning',
  };
}
</script>