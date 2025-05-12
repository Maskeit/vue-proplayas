// src/interfaces/CrudStore.ts
import type { Ref } from 'vue';

export interface CrudStore<T> {
  items : Ref<T[]>;                                          // lista reactiva
  fetch : () => Promise<void>;                               // GET all
  create: (payload: T) => Promise<any>;                      // POST
  update: (id: number | string, payload: T) => Promise<any>; // PUT / PATCH
  delete: (id: number | string) => Promise<any>;             // DELETE
}