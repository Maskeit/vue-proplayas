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
      <!-- Puedes agregar más campos (organizer_type, organizer_id, format, location) según necesites -->
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Webinar</button>
      </div>
    </form>

    <!-- Lista de Eventos existentes -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Tus Eventos</h2>
      <div v-if="!isLoading && events.length > 0">
        <!-- panel de eventos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WebinarCard v-for="event in events" :key="event.id" v-bind="event"
            @edit="openEditModal(event)"
            @delete="deleteEvent(event)" />
        </div>
      </div>
      <div v-else>
        <p>Cargando eventos...</p>
      </div>
      <EditWebinar :visible="isEditModalOpen" :formData="formData" @close="closeEditModal" @update="onUpdate" />
    </div>
    <Confirmation 
      v-if="confirmation.isOpen" 
      :message="confirmation.message" 
      :type="confirmation.type"
      @close="confirmation.isOpen = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Webinar } from '@interfaces/Content';
import WebinarCard from '../CMS/Cards/WebinarCard.vue';
import EditWebinar from './Modals/EditWebinar.vue';
import { useContentStore } from '@/services/Stores/ContentStore';
import Confirmation from '../modales/Confirmation.vue';

const contentStore = useContentStore();
// estados
const events = computed(() => contentStore.events);
const isLoading = ref(true);
const confirmation = ref({
  isOpen: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'warning',
});


onMounted(async () => {
  isLoading.value = true;
  await contentStore.fetchEvents();
  isLoading.value = false;
});


// Debido a que el input type="date" trabaja con string, definimos un tipo auxiliar para el formulario
interface WebinarFormData extends Omit<Webinar, 'date'> {
  dateString: string;
  timeString: string;
}
// Lista reactiva de webinars (puedes cargar datos desde un JSON o un endpoint real)

// Datos del formulario con valores iniciales vacíos
const formData = ref<WebinarFormData>({
  id: 0,
  title: '',
  description: '',
  organizer_type: '',
  organizer_id: 0,
  link: '',
  format: '',
  location: null,
  dateString: '',
  timeString: '',
});

const selectedEvent = ref<Webinar | null>(null);
const isEditModalOpen = ref(false);

function openEditModal(event: Webinar) {
  selectedEvent.value = event;
  formData.value = {
    ...event,
    dateString: event.date.slice(0, 10),
    timeString: event.date.slice(11, 16),
  };
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
  selectedEvent.value = null;
}

// Función para formatear la fecha a una cadena legible
function formatDateToMySQL(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// Función para manejar el envío del formulario
async function onSubmit() {
  // Convertir la fecha en formato string a Date
  const [hours, minutes] = formData.value.timeString.split(':').map(Number);
  const date = new Date(formData.value.dateString);
  date.setHours(hours);
  date.setMinutes(minutes);

  const newWebinar: Webinar = {
    ...formData.value,
    id: Date.now(),
    date: formatDateToMySQL(date),
  } as unknown as Webinar; // forzamos el tipo si aún espera un Date

  try {
    const statusCode = await contentStore.createEvent(newWebinar);
    showConfirmation(`Evento creado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al crear el evento.', 'error');
    console.error("Error al crear evento", err);
  }

  // Limpiar el formulario
  formData.value = {
    id: 0,
    title: '',
    description: '',
    organizer_type: '',
    organizer_id: 0,
    link: '',
    format: '',
    location: null,
    dateString: '',
    timeString: '',
  };
}
// Función para actualizar un evento existente
async function onUpdate() {
  if (!selectedEvent.value) return;

  const [hours, minutes] = formData.value.timeString.split(':').map(Number);
  const date = new Date(formData.value.dateString);
  date.setHours(hours);
  date.setMinutes(minutes);

  const updatedWebinar: Webinar = {
    ...formData.value,
    id: selectedEvent.value.id,
    date: formatDateToMySQL(date),
  } as unknown as Webinar;

  try {
    const statusCode = await contentStore.updateEvent(updatedWebinar, selectedEvent.value.id);
    closeEditModal();
    showConfirmation(`Evento actualizado con éxito.`, 'success');
  } catch (err) {
    showConfirmation('Error al actualizar el evento.', 'error');
    console.error("Error al actualizar evento", err);
  }
}
// Función para mostrar la confirmación
function showConfirmation(message: string, type: 'success' | 'error' | 'warning' = 'success') {
  confirmation.value.message = message;
  confirmation.value.type = type;
  confirmation.value.isOpen = true;
}

function deleteEvent(event: { id: number; title: string }) {
  selectedEvent.value = event;
  confirmation.value = {
    isOpen: true,
    message: `¿Estás seguro de que deseas eliminar el evento "${event.title}"?`,
    type: 'warning',
  };
}

async function confirmDelete() {
  if (!selectedEvent.value) return;
  try {
    const statusCode = await contentStore.deleteEvent(selectedEvent.value.id);
    showConfirmation(`Evento eliminado con éxito. Código de estado: ${statusCode}`, 'success');
  } catch (err) {
    showConfirmation('Error al eliminar el evento.', 'error');
  } finally {
    selectedEvent.value = null;
  }
}
</script>