import type { Events, Projects, Publications, Books  } from "@interfaces/Content";

/**
 * Form data for the Event form
 *  
 * */

export type EventFormData = Partial<Pick<Events, 'id'>> & Omit<Events, 'id' | 'date' | 'cover_image' | 'type' | 'format'> & {
  dateString: string;
  timeString: string;
  cover_image_file?: string;
  type: Events["type"] | null;
  format: Events["format"] | null;
}

export const EMPTY_EVENT_FORM: EventFormData = {
  title: '',
  description: '',
  type: null,
  dateString: '',
  timeString: '',
  link: '',
  format: null,
  location: '',
  cover_image_file: '',
};