import type { Events, Projects, Publications, Books  } from "@interfaces/Content";

/**
 * Form data for the Event form
 *  
 * */

export type EventFormData = Omit<Event, 'date' | 'cover_image'> & {
    dateString: string;
    timeString: string;
    cover_image_file?: string;
}
export const EMPTY_EVENT_FORM: EventFormData = {
  title: '',
  description: '',
  type: '',
  dateString: '',
  timeString: '',
  link: '',
  format: '',
  location: '',
  cover_image_file: '',
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