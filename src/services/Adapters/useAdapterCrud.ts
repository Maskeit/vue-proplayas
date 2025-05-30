import { computed } from 'vue';
import { useContentStore } from '@/services/Stores/ContentStore';
import type { Events, Publications, Books, Projects, Series } from '@interfaces/Content';
import type { CrudStore } from '@interfaces/CrudStore';

/**
 * Adaptador que expone los métodos y el estado CRUD de Eventos
 * bajo la interfaz genérica CrudStore<Event>.
 *
 * De esta manera, los componentes pueden usar `useCrud<Event>(useEventCrud())`
 * sin acoplarse directamente a Pinia ni a los nombres concretos del store.
 */


export function useEventCrud(): CrudStore<Events> {
  const s = useContentStore();
  return {
    // Lista reactiva de eventos
    items: computed(() => s.contentMap['events']),
    // Métodos CRUD generalizados para 'events'
    fetch : () => s.fetchContentAuthor('events'), //funciona
    create: (payload: Events) => s.createContent('event', payload), // funciona
    update: (id: number | string, payload: Events) => s.updateContent('event', Number(id), payload),
    delete: (id: number) => s.deleteContent('event', id),
  };
}

// Adaptador para publicaciones
export function usePublicationCrud(): CrudStore<Publications> {
  const s = useContentStore();
  return {
    items: computed(() => s.contentMap['publications']),
    fetch: () => s.fetchContentAuthor('publications'),
    create: (payload: Publications) => s.createContent('publication', payload),
    update: (id: number | string, payload: Publications) => s.updateContent('publication', Number(id), payload),
    delete: (id: number) => s.deleteContent('publication', id),
  };
}

// Adaptador para libros
export function useBookCrud(): CrudStore<Books> {
  const s = useContentStore();
  return {
    items: computed(() => s.contentMap['books']),
    fetch: () => s.fetchContentAuthor('books'),
    create: (payload: Books) => s.createContent('book', payload),
    update: (id: number | string, payload: Books) => s.updateContent('book', Number(id), payload),
    delete: (id: number) => s.deleteContent('book', id),
  };
}

// Adaptador para proyectos
export function useProjectCrud(): CrudStore<Projects> {
  const s = useContentStore();
  return {
    items: computed(() => s.contentMap['projects']),
    fetch: () => s.fetchContentAuthor('projects'),
    create: (payload: Projects) => s.createContent('project', payload),
    update: (id: number | string, payload: Projects) => s.updateContent('project', Number(id), payload),
    delete: (id: number) => s.deleteContent('project', id),
  };
}

// Adaptador para series
export function useSeriesCrud(): CrudStore<Series> {
  const s = useContentStore();
  return {
    items: computed(() => s.contentMap['series']),
    fetch: () => s.fetchContentAuthor('series'),
    create: (payload: Series) => s.createContent('series', payload),
    update: (id: number | string, payload: Series) => s.updateContent('series', Number(id), payload),
    delete: (id: number) => s.deleteContent('series', id),
  };
}