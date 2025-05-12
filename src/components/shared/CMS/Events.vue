<template>
  <div class="text-gray-600 dark:text-gray-100">
    <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>

    <!-- Formulario para crear un Evento -->
    <form @submit.prevent="onSubmit" class="p-4 space-y-4 mb-8 bg-white dark:bg-zinc-600 shadow-md rounded-lg">
      <div>
        <label class="block text-sm font-medium ">Título</label>
        <input v-model="formData.title" type="text" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium ">Descripción</label>
        <textarea v-model="formData.description" class="mt-1 block w-full border rounded px-3 py-2 field-sizing-content"
          required></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium ">Tipo de evento</label>
        <select v-model="formData.type" class="mt-1 block w-full border rounded px-3 py-2" required>
          <option value="" disabled>Selecciona un tipo de evento</option>
          <option value="webinar">Webinar</option>
          <option value="congreso">Congreso</option>
          <option value="magistrado">Magistrado</option>
          <option value="clase">Clase</option>
          <option value="taller">Taller</option>
          <option value="charla">Charla</option>
          <option value="conferencia">Conferencia</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium ">Fecha del Evento</label>
        <!-- Usamos un campo de tipo date y almacenamos el valor en dateString -->
        <input v-model="formData.dateString" type="date" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Hora del Evento</label>
        <input v-model="formData.timeString" type="time" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium ">Enlace al evento o de registro</label>
        <input v-model="formData.link" type="url" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Modalidad del Evento</label>
        <select v-model="formData.format" class="mt-1 block w-full border rounded px-3 py-2" required>
          <option value="" disabled>Selecciona un formato</option>
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium ">Lugar donde se llevará a cabo el evento</label>
        <input v-model="formData.location" type="text" class="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Portada del evento</label>
        <input ref="coverInputRef" type="file" @change="handleCoverImageUpload" accept="image/*"
          class="mt-1 block w-full border rounded px-3 py-2" />
        <div v-if="formData.cover_image" class="mt-2 relative w-48">
          <img :src="formData.cover_image" alt="Portada del evento" class="rounded border w-full h-auto" />
          <button @click="removeCoverImage" type="button"
            class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs">✕</button>
        </div>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Evento</button>
      </div>
    </form>

    <!-- Lista de Eventos existentes -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Tus Eventos</h2>
      <div v-if="!isLoading && events.length > 0">
        <!-- panel de eventos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EventCard v-for="event in events" :key="event.id" v-bind="event" @edit="openEditModal(event)"
            @delete="deleteEvent(event)" />
        </div>
      </div>
      <div v-else>
        <p>Cargando eventos...</p>
      </div>
      <EditEvent :visible="isEditModalOpen" :formData="formData" @close="closeEditModal" @update="onUpdate" />
    </div>
    <Confirmation v-if="confirmation.isOpen" :message="confirmation.message" :type="confirmation.type"
      @close="confirmation.isOpen = false" @confirm="confirmDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Event } from '@interfaces/Content';
import EventCard from '../CMS/Cards/EventCard.vue';
import EditEvent from './Modals/EditEvent.vue';
import { useCrud } from '@/components/shared/CMS/Composables/useCrud';
import { useEventCrud } from '@/services/Adapters/useAdapterCrud';

import Confirmation from '../modales/Confirmation.vue';
import { buildDateTimeMySQL } from '@/utils/validators/dateUtils';
import { useForm } from '@/components/shared/CMS/Composables/useForm';
import { EMPTY_EVENT_FORM, type EventFormData } from '@interfaces/forms';


// estados
const { data: formData, reset, patch } = useForm<EventFormData>(EMPTY_EVENT_FORM);

// CRUD genérico para eventos
const {
  items: events,
  isLoading,
  fetchAll,
  create,
  update,
  remove,
} = useCrud<Event>(useEventCrud());

const confirmation = ref({
  isOpen: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'warning',
});

onMounted(fetchAll);

// Debido a que el input type="date" trabaja con string, definimos un tipo auxiliar para el formulario

const selectedEvent = ref<Event | null>(null);
const isEditModalOpen = ref(false);

const openEditModal = (event: Event) => {
  selectedEvent.value = event;

  // ── Extraer dateString y timeString con seguridad ──
  let dateString = '';
  let timeString = '';

  if (event.date) {
    const iso = event.date
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
    ...event,
    dateString,
    timeString,
    cover_image: event.cover_image ?? '',
  });

  isEditModalOpen.value = true;
};
function closeEditModal() {
  isEditModalOpen.value = false;
  selectedEvent.value = null;
}
// Función para manejar el envío del formulario
const onSubmit = async () => {
  const newEvent: Event = {
    ...formData.value,
    date: buildDateTimeMySQL(formData.value.dateString, formData.value.timeString),
  } as unknown as Event;

  try {
    await create(newEvent);
    showConfirmation(`Evento creado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al crear el evento.', 'error');
    console.error("Error al crear evento", err);
  }

  reset();
}
// Función para actualizar un evento existente
const onUpdate = async() => {
  if (!selectedEvent.value) return;
  const updatedEvent: Event = {
    ...formData.value,
    //id: selectedEvent.value.id,
    date: buildDateTimeMySQL(formData.value.dateString, formData.value.timeString),
  } as unknown as Event;

  try {
    await update(updatedEvent,selectedEvent.value.id,);
    closeEditModal();
    showConfirmation(`Evento actualizado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al actualizar el evento.', 'error');
    console.error("Error al actualizar evento", err);
  }
}
// Función para confirmar la eliminación de un evento 
const confirmDelete = async () => {
  if (!selectedEvent.value) return;
  try {
    await remove(selectedEvent.value.id);
    showConfirmation(`Evento eliminado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al eliminar el evento.', 'error');
  } finally {
    selectedEvent.value = null;
  }
}
const handleCoverImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
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
const deleteEvent = (event: { id: number; title: string }) => {
  selectedEvent.value = event;
  confirmation.value = {
    isOpen: true,
    message: `¿Estás seguro de que deseas eliminar el evento "${event.title}"?`,
    type: 'warning',
  };
}
</script>