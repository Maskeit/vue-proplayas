<template>
  <div class="text-gray-600 dark:text-gray-100">
    <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>

    <div class="grid grid-cols-2 gap-5">
      <!-- Columna izquierda: Formulario -->
      <div class="order-1">
        <EventForm :formData="formData" @submit="(type) => onSubmit(type)" />
      </div>

      <!-- Lista de Eventos existentes -->
      <!-- <div class="order-2">
        <h2 class="text-2xl font-bold mb-4">Tus Eventos</h2>
        <div v-if="!isLoading && events.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <EventCard v-for="event in events" :key="event.id" v-bind="event" @edit="openEditModal(event)"
              @delete="deleteEvent(event)" />
          </div>
        </div>
        <div v-else>
          <p>Cargando eventos...</p>
        </div>
        <EditEvent :visible="isEditModalOpen" :formData="formData" @close="closeEditModal" @update="onUpdate" />
      </div> -->
    </div>
    <!-- <Confirmation v-if="confirmation.isOpen" :message="confirmation.message" :type="confirmation.type"
      @close="confirmation.isOpen = false" @confirm="confirmDelete" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';

import type { Events } from '@interfaces/Content'; // estructura de como se recibe
import EventForm from './Forms/EventForm.vue';
import EventPreview from './FormPreview/EventPreview.vue';
import EventCard from '../CMS/Cards/EventCard.vue';
import EditEvent from './Modals/EditEvent.vue';
import { useCrud } from '@/components/shared/CMS/Composables/useCrud';
import { useEventCrud } from '@/services/Adapters/useAdapterCrud';
import { EMPTY_EVENT_FORM, type EventFormData } from '@interfaces/forms'; // estructura de como se envia
import Confirmation from '../modales/Confirmation.vue';
//import type { Ref } from "vue"
import { useSubmitMethods, usePanelUtilities } from './Composables/panelMethods';

const formData = ref<EventFormData>({ ...EMPTY_EVENT_FORM });
const reset = () => {
  formData.value = { ...EMPTY_EVENT_FORM };
};
const patch = (val: Partial<EventFormData>) => {
  formData.value = { ...formData.value, ...val };
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

const { onSubmit: submitMethod, onUpdate } = useSubmitMethods<Events>({
  formData: formData as Ref<Partial<Events>>,
  reset,
  create,
  update,
  selectedItem,
  closeModal: () => {},
  showConfirmation: (msg, type) => {
    confirmation.value = {
      isOpen: true,
      message: msg,
      type,
    };
  },
});

const onSubmit = (type: string) => {
  submitMethod(type);
};
</script>