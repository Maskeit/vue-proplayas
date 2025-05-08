import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ContentController } from '@/services/Class/content/ContentController'
import type { Webinar } from '@interfaces/Content'

const controller = new ContentController()

export const useContentStore = defineStore('content', () => {
  const events = ref<Webinar[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchEvents(force = false) {
    if (events.value.length > 0 && !force) return events.value;
  
    loading.value = true;
    error.value = null;
  
    try {
      const { status, data } = await controller.getEvents();
      events.value = data;
      return events.value;
    } catch (err: any) {
      error.value = err.message || 'Error al obtener events';
    } finally {
      loading.value = false;
    }
  }

  async function getEvent(id: number): Promise<Webinar | null> {
    try {
      const response = await controller.getEvent(id)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener el webinar'
      return null
    }
  }

  async function createEvent(payload: Webinar) {
    try {
      const { status, data } = await controller.newEvent(payload)
      await fetchEvents()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al crear el webinar'
    }
  }

  async function updateEvent(payload: Webinar, id: number) {
    try {
      const { status, data } = await controller.updateEvent(payload, id)
      await fetchEvents()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar el webinar'
    }
  }

  async function deleteEvent(id: number) {
    try {
      const { status, data } = await controller.deleteEvent(id)
      await fetchEvents()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar el webinar'
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  }
})