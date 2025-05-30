import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { ContentController } from '@/services/Class/content/ContentController'

const controller = new ContentController()

export const useContentStore = defineStore('content', () => {
  const contentMap = reactive<Record<string, any[]>>({
    events: [],
    projects: [],
    publications: [],
    books: [],
    series: [],
    chapters: [],
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  // trae todos los contenidos depende el argumento pasado
  async function fetchContent(typeContent: string) {
    error.value = null;
    try {
      const { status, data } = await controller.getContent(typeContent)
      if (status === 200) {
        contentMap[typeContent] = data
      }
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener events';
    }
  }
  // trae todos los contenidos solo del autor depende el argumento pasado
    async function fetchContentAuthor(typeContent: string) {
    error.value = null;
    try {
      const { status, data } = await controller.getContentAuthor(typeContent)
      if (status === 200) {
        contentMap[typeContent] = data
      }
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener events';
    }
  }
  
  // crear contenido genérico
  async function createContent(content: string, payload: any) {
    error.value = null;
    try {
      const { status, data } = await controller.createContent(content, payload)
      if (status === 200) {
        contentMap[content].push(data)
      }
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al crear el contenido'
    }
  }

  // actualizar contenido genérico
  async function updateContent(content: string, id: number, payload: any) {
    error.value = null;
    try {
      const { status, data } = await controller.updateContent(content, id, payload)
      if (status === 200) {
        contentMap[content] = contentMap[content].map(item => item.id === id ? data : item)
      }
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar el contenido'
    }
  }

  // eliminar contenido genérico
  async function deleteContent(content: string, id: number) {
    error.value = null;
    try {
      const { status } = await controller.deleteContent(content, id)
      if (status === 200) {
        contentMap[content] = contentMap[content].filter(item => item.id !== id)
      }
      return status
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar el contenido'
    }
  }

  // cambiar estado (toggle)
  async function toggleStatus(content: string, id: number) {
    error.value = null;
    try {
      const { status, data } = await controller.toggleStatus(content, id)
      if (status === 200) {
        contentMap[content] = contentMap[content].map(item => item.id === id ? data : item)
      }
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al cambiar el estado del contenido'
    }
  }

  return {
    // data returned
    contentMap,
    // states
    loading,
    error,
    //method
    fetchContent,
    fetchContentAuthor,
    createContent,
    updateContent,
    deleteContent,
    toggleStatus,
  }
})