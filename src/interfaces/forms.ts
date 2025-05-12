import type { Event, Project, Articles, Books  } from "@interfaces/Content";

/**
 * Form data for the Event form
 *  
 * */

export type EventFormData = Omit<Event, 'date' | 'cover_image'> & {
    dateString: string;
    timeString: string;
    cover_image?: string;
}
export const EMPTY_EVENT_FORM: EventFormData = {
  title: '',
  description: '',
  type: '' as any,      // TS insiste en el union; inicia vacío
  link: '',
  format: '',
  location: null,
  dateString: '',
  timeString: '',
  cover_image: undefined,
};


/* ---------- PROJECT ---------- */
export type ProjectFormData = Omit<Project, 'date'> & {
  dateString: string;
  timeString: string;
};

export const EMPTY_PROJECT_FORM: ProjectFormData = {
  title: '',
  description: '',
  location: '',
  link: '',
  participants: '',
  cover_image: undefined,
  dateString: '',
  timeString: '',
};