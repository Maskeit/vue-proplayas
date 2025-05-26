import { buildDateTimeMySQL } from '@utils/validators/dateUtils'
import type { Ref } from "vue"


export function useSubmitMethods<T extends Record<string, any>>({
  formData,
  reset,
  create,
  update,
  remove,
  items,
  selectedItem,
  closeModal,
  showConfirmation,
  fetchAll,
}: {
  formData: Partial<T>,
  reset: () => void,
  create: (data: Partial<T>) => Promise<void>,
  update: (data: Partial<T>, id: number) => Promise<void>,
  remove: (id: number) => Promise<void>,
  items: Ref<T[]>,
  selectedItem: Ref<T | null>,
  closeModal: () => void,
  showConfirmation: (msg: string, type: 'success' | 'error' | 'warning') => void,
  fetchAll?: () => Promise<void>;
}) {
  const onSubmit = async (contentType: string) => {
    const payload: any = { ...formData };
    // Solo si contiene dateString y timeString, formateamos
    if ('dateString' in formData && 'timeString' in formData) {
      payload.date = buildDateTimeMySQL(formData.dateString, formData.timeString);
    }
    try {
      await create(payload);
      showConfirmation(`${contentType} creado con éxito.`, 'success');
      reset();
      if (typeof fetchAll === 'function') await fetchAll();
    } catch (err) {
      showConfirmation(`Error al crear ${contentType}.`, 'error');
      console.error(`Error al crear ${contentType}`, err);
    }
  };

  const onUpdate = async () => {
    if (!selectedItem.value) return;
    const updatedItem: Partial<T> = {
      ...formData,
      ...(formData.dateString && formData.timeString
        ? { date: buildDateTimeMySQL(formData.dateString, formData.timeString) }
        : {}),
    };

    try {
      await update(updatedItem, selectedItem.value.id);
      closeModal();
      showConfirmation(`Evento actualizado con éxito.`, 'success');
    } catch (err) {
      showConfirmation('Error al actualizar el evento.', 'error');
      console.error("Error al actualizar evento", err);
    }
  };

  const onDelete = async (contentType: string) => {
    if (!selectedItem.value) return;

    try {
      await remove(selectedItem.value.id);
      // Eliminar del array manualmente sin recargar la lista
      const index = items.value.findIndex((i) => i.id === selectedItem.value?.id);
      if (index !== -1) items.value.splice(index, 1);
      reset();
      closeModal();
      showConfirmation(`${contentType} eliminado con éxito.`, 'success');
      selectedItem.value = null;
    } catch (err) {
      showConfirmation(`Error al eliminar ${contentType}.`, 'error');
      console.error(`Error al eliminar ${contentType}`, err);
    }
  };

  return { onSubmit, onUpdate, onDelete };
}

export function usePanelUtilities<T extends Record<string, any>>({
  formData,
  selectedItem,
  confirmation,
  fileInputRef,
  coverImagePreview
}: {
  formData: Partial<T>,
  selectedItem: Ref<T | null>,
  confirmation: Ref<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'warning' }>,
  fileInputRef: Ref<HTMLInputElement | null>,
  coverImagePreview: Ref<string>
}) {
  const openModal = (item: T, patch: (val: Partial<T>) => void) => {
    selectedItem.value = item;
    patch(item); // El padre decide cómo hacer el patch según el tipo
  };

  const closeModal = () => {
    selectedItem.value = null;
  };

  const confirmDelete = (item: T, title: string) => {
    selectedItem.value = item;
    confirmation.value = {
      isOpen: true,
      message: `¿Estás seguro de que deseas eliminar "${title}"?`,
      type: 'warning',
    };
  };

  // Maneja la subida de imágenes (jpg, png, webp) FUNCIONA CORRECTAMENTE
  const handleImageUpload = <K extends keyof T>(e: any, fieldName: K) => {
    const target = e.target as HTMLInputElement;
    if (target?.files && target.files[0]) {
      const file = target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

      if (!validTypes.includes(file.type)) {
        confirmation.value = {
          isOpen: true,
          message: 'Solo se permiten imágenes (JPG, PNG, WEBP)',
          type: 'error',
        };
        if (fileInputRef.value) fileInputRef.value.value = '';
        return;
      }

      // Asignamos el archivo directamente
      formData[fieldName] = file as unknown as T[K];

      // ✅ Para mostrar la vista previa:
      const reader = new FileReader();
      reader.onload = () => {
        coverImagePreview.value = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja la subida de archivos PDF
  const handlePdfUpload = <K extends keyof T>(e: any, fieldName: K) => {
    const target = e.target as HTMLInputElement;
    if (target?.files && target.files[0]) {
      const file = target.files[0];
      const validTypes = ['application/pdf'];

      if (!validTypes.includes(file.type)) {
        confirmation.value = {
          isOpen: true,
          message: 'Solo se permiten archivos PDF.',
          type: 'error',
        };
        if (fileInputRef.value) fileInputRef.value.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        formData[fieldName] = reader.result as unknown as T[K];
      };
      reader.readAsDataURL(file);
    }
  };
  const clearFileInput = () => {
    if (fileInputRef.value) fileInputRef.value.value = '';
  };

  // funciona correctamente
  const removeFileFromFormData = <K extends keyof T>(fieldName: K) => {
    formData[fieldName] = '' as unknown as T[typeof fieldName];
    clearFileInput();
  };

  return {
    openModal,
    closeModal,
    confirmDelete,
    handleImageUpload,
    handlePdfUpload,
    clearFileInput,
    removeFileFromFormData,
  };
}