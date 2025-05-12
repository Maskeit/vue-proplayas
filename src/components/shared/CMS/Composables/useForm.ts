import { reactive, toRef } from 'vue';

export function useForm<T>(initial: T) {
  const state = reactive({ data: { ...initial } });

  const reset = () => Object.assign(state.data, initial);
  const patch = (partial: Partial<T>) => Object.assign(state.data, partial);
  const setField = <K extends keyof T>(k: K, v: T[K]) => { state.data[k] = v; };

  return { data: toRef(state, 'data'), reset, patch, setField };
}