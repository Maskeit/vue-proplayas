// src/composables/useCrud.ts
import { ref, computed } from 'vue';
//import type { useContentStore } from '@/services/Stores/ContentStore';
import type { CrudStore } from '@interfaces/CrudStore';
/**
 * Composable genérico que agrega estado `isLoading`
 * y normaliza los métodos CRUD de cualquier proveedor
 * que cumpla con la interfaz CrudStore<T>.
 */
export function useCrud<T>(provider: CrudStore<T>) {
    const isLoading = ref(false);

    const fetchAll = async () => {
        if (provider.items.value.length) return; // evita petición doble
        isLoading.value = true;
        await provider.fetch();
        isLoading.value = false;
    };
    return {
        items: computed(() => provider.items.value),
        isLoading,
        fetchAll,
        create: provider.create,
        update: provider.update,
        remove: provider.delete,
    };
}