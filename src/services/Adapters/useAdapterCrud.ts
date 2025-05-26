import { computed } from 'vue';
import { useContentStore } from '@/services/Stores/ContentStore';
import type { Event } from '@interfaces/Content';
import type { CrudStore } from '@interfaces/CrudStore';

/**
 * Adaptador que expone los métodos y el estado CRUD de Eventos
 * bajo la interfaz genérica CrudStore<Event>.
 *
 * De esta manera, los componentes pueden usar `useCrud<Event>(useEventCrud())`
 * sin acoplarse directamente a Pinia ni a los nombres concretos del store.
 */


export function useEventCrud(): CrudStore<Event> {
  const s = useContentStore();

  return {
    // Lista reactiva de eventos
    items: computed(() => s.contentMap['events']),
    // Métodos CRUD generalizados para 'events'
    fetch : () => s.fetchContentAuthor('events'), //funciona
    create: (payload: Event) => s.createContent('event', payload), // funciona
    update: (payload: Event, id: number) => s.updateContent('event', id, payload),
    delete: (id: number) => s.deleteContent('event', id),
  };
}

/**
 * Adaptador que expone los métodos y el estado CRUD de Proyectos
 * bajo la interfaz genérica CrudStore<Project>.
 *
 * De esta manera, los componentes pueden usar `useCrud<Project>(useProjectCrud())`
 * sin acoplarse directamente a Pinia ni a los nombres concretos del store.
 */
export function useProjectsCrud(): CrudStore<Event> {
  const s = useContentStore();
  return {
    // Lista reactiva de eventos
    items: computed(() => s.projects),
    // Métodos CRUD
    fetch : s.fetchProjects,
    create: s.createProject,
    update: s.updateProject,
    delete: s.deleteProject,
  };
}