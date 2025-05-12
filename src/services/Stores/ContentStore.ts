import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ContentController } from '@/services/Class/content/ContentController'
import type { Event, Project, Books, Articles } from '@interfaces/Content'

const controller = new ContentController()

export const useContentStore = defineStore('content', () => {
  const events = ref<Event[]>([])
  const projects = ref<Project[]>([])
  const articles = ref<Articles[]>([])
  const books = ref<Books[]>([])
  const series = ref<any[]>([]) // Cambia 'any' por el tipo adecuado
  const chapters = ref<any[]>([]) // Cambia 'any' por el tipo adecuado


  const loading = ref(false)
  const error = ref<string | null>(null)

  // seccion de Eventos
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
  async function getEvent(id: number): Promise<Event | null> {
    try {
      const response = await controller.getEvent(id)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener el Event'
      return null
    }
  }
  async function createEvent(payload: Event) {
    try {
      const { status, data } = await controller.newEvent(payload)
      await fetchEvents()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al crear el Event'
    }
  }
  async function updateEvent(payload: Event, id: number) {
    try {
      const { status, data } = await controller.updateEvent(payload, id)
      await fetchEvents()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar el Event'
    }
  }
  async function deleteEvent(id: number) {
    try {
      const { status, data } = await controller.deleteEvent(id)
      await fetchEvents()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar el Event'
    }
  }

  // seccion de proyectos colaborativos de bajo costo
  async function fetchProjects(force = false) {
    if(projects.value.length > 0 && !force) return projects.value
    loading.value = true
    error.value = null
    try {
      const { status, data } = await controller.getPCBC()
      projects.value = data
      return projects.value
    } catch (err: any) {
      error.value = err.message || 'Error al obtener los proyectos'
    } finally {
      loading.value = false
    }
  }
  async function getProject(id: number): Promise<Project | null> {
    try {
      const response = await controller.getPCBCById(id)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener el proyecto'
      return null
    }
  }
  async function createProject(payload: Project) {
    try {
      const { status, data } = await controller.newPCBC(payload)
      await fetchProjects()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al crear el proyecto'
    }
  }
  async function updateProject(payload: Project, id: number) {
    try {
      const { status, data } = await controller.updatePCBC(payload, id)
      await fetchProjects()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar el proyecto'
    }
  }
  async function deleteProject(id: number) {
    try {
      const { status, data } = await controller.deletePCBC(id)
      await fetchProjects()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar el proyecto'
    }
  }

  // seccion de libros
  async function fetchBooks() {
    if(books.value.length > 0) return books.value
    loading.value = true
    error.value = null
    try {
      const { status, data } = await controller.getBooks()
      books.value = data
      return books.value
    } catch (err: any) {
      error.value = err.message || 'Error al obtener los libros'
    } finally {
      loading.value = false
    }
  }
  async function getBook(id: number): Promise<Books | null> {
    try {
      const response = await controller.getBook(id)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener el libro'
      return null
    }
  }
  async function createBook(payload: Books) {
    try {
      const { status, data } = await controller.newBook(payload)
      await fetchBooks()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al crear el libro'
    }
  }
  async function updateBook(payload: Books, id: number) {
    try {
      const { status, data } = await controller.updateBook(payload, id)
      await fetchBooks()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar el libro'
    }
  }
  async function deleteBook(id: number) {
    try {
      const { status, data } = await controller.deleteBook(id)
      await fetchBooks()
      return status;
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar el libro'
    }
  }


  return {
    // data returned
    events,
    projects,
    articles,
    books,
    series,
    chapters,
    // states
    loading,
    error,
    // methods
    // event methods
    fetchEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    // project methods
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    // book methods
    fetchBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    // article methods
  }
})