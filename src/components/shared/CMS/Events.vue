<template>
  <div class="text-gray-600 dark:text-gray-100">
    <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>

    <div class="grid grid-cols-1 gap-5">
      <!-- Columna izquierda: Formulario -->
      <div class="order-1">
        <EventForm :formData="createFormData" @submit="(type) => onSubmit(type)" />
      </div>

      <!-- Lista de Eventos existentes -->
      <div class="order-2">
        <h2 class="text-2xl font-bold mb-4">Tus Eventos</h2>
        <div v-if="!isLoading && events.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <EventCard v-for="event in events" :key="event.id" v-bind="event" @edit="openEditModal(event)"
              @delete="triggerDeleteModal(event)" />
          </div>
        </div>
        <div v-else>
          <p>Cargando eventos...</p>
        </div>
        <EditEvent :visible="isEditModalOpen" :formData="editFormData" @close="closeEditModal" @update="onUpdate" />
      </div>
    </div>
    <Confirmation v-if="confirmation.isOpen" :message="confirmation.message" :type="confirmation.type"
      @close="confirmation.isOpen = false"   @confirm="handleConfirmDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, reactive, computed } from 'vue';

import type { Events } from '@interfaces/Content'; // estructura de como se recibe
import EventForm from './Forms/EventForm.vue';
import EventCard from '../CMS/Cards/EventCard.vue';
import EditEvent from './Forms/Edit/EditEvent.vue';
import { useCrud } from '@/components/shared/CMS/Composables/useCrud';
import { useEventCrud } from '@/services/Adapters/useAdapterCrud';
import { EMPTY_EVENT_FORM, type EventFormData } from '@interfaces/forms'; // estructura de como se envia
import Confirmation from '../modales/Confirmation.vue';
//import type { Ref } from "vue"
import { useSubmitMethods, usePanelUtilities, splitDateTimeISOString } from './Composables/panelMethods';

const formData = reactive<EventFormData>({ ...EMPTY_EVENT_FORM });
const createFormData = reactive<EventFormData>({ ...EMPTY_EVENT_FORM });
const editFormData = reactive<EventFormData>({ ...EMPTY_EVENT_FORM });


// limpia el formulario
const reset = () => {
  Object.assign(formData, EMPTY_EVENT_FORM);
};

const patch = (val: Partial<EventFormData>) => {
  Object.assign(formData, val);
};
// CRUD genérico para eventos
const {
  items: events,
  isLoading,
  fetchAll,
  create,
  update,
  remove,
} = useCrud<Events>(useEventCrud());
onMounted(fetchAll);

const selectedItem = ref<Events | null>(null);
const confirmation = ref({ isOpen: false, message: '', type: 'success' });
const isEditModalOpen = ref(false);

const { onSubmit: submitMethod, onUpdate, onDelete } = useSubmitMethods<Events>({
  formData: formData as Partial<Events>,
  reset,
  create,
  update,
  remove,
  selectedItem,
  closeModal: () => {},
  showConfirmation: (msg, type) => {
    confirmation.value = {
      isOpen: true,
      message: msg,
      type,
    };
  },
  fetchAll,
  items: events,
});

const onSubmit = (type: string) => {
  submitMethod(type);
};

const { confirmDelete, openModal, closeModal } = usePanelUtilities<EventFormData>({
  formData,
  selectedItem,
  confirmation,
  fileInputRef: ref(null),
  coverImagePreview: ref(''),
});

const triggerDeleteModal = (event: Events) => {
  confirmDelete(event, event.title);
};
const handleConfirmDelete = () => {
  onDelete('evento'); // ← este sí es el de useSubmitMethods
  confirmation.value.isOpen = false; // opcional si no se cierra dentro
};

const openEditModal = (event: Events) => {
  const { dateString, timeString } = splitDateTimeISOString(event.date);
  const patchedEvent = {
    ...event,
    dateString,
    timeString,
  };
  openModal(patchedEvent, (val) => Object.assign(editFormData, val));
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};
</script>