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
import type { Projects } from '@interfaces/Content';
import ProyectoCard from './Cards/ProyectoCard.vue'; // faltan de configurar
import EditProyecto from './Modals/EditProyecto.vue'; // faltan de configurar
import { useCrud } from '@/components/shared/CMS/Composables/useCrud';
import { useProjectCrud } from '@/services/Adapters/useAdapterCrud';

import Confirmation from '../modales/Confirmation.vue';
import { buildDateTimeMySQL } from '@/utils/validators/dateUtils';

import { EMPTY_PROJECT_FORM, type ProjectFormData } from '@/interfaces/Forms';

// estados


// CRUD genérico para Proyectos
const {
    items: projects,
    isLoading,
    fetchAll,
    create,
    update,
    remove,
} = useCrud<Projects>(useProjectCrud());
</script>