import { buildDateTimeMySQL } from '@/utils/validators/dateUtils'
import type { Ref } from "vue"


export function useSubmitMethods<T extends Record<string, any>>({
  formData,
  reset,
  create,
  update,
  selectedItem,
  closeModal,
  showConfirmation
}: {
  formData: Ref<Partial<T>>,
  reset: () => void,
  create: (data: Partial<T>) => Promise<void>,
  update: (data: Partial<T>, id: number) => Promise<void>,
  selectedItem: Ref<T | null>,
  closeModal: () => void,
  showConfirmation: (msg: string, type: 'success' | 'error' | 'warning') => void,
}) {
  const onSubmit = async (contentType: string) => {
    const payload: any = { ...formData.value };

    // Solo si contiene dateString y timeString, formateamos
    if ('dateString' in formData.value && 'timeString' in formData.value) {
      payload.date = buildDateTimeMySQL(formData.value.dateString, formData.value.timeString);
    }

    try {
      await create(payload.value);
      showConfirmation(`${contentType} creado con éxito.`, 'success');
      reset();
    } catch (err) {
      showConfirmation(`Error al crear ${contentType}.`, 'error');
      console.error(`Error al crear ${contentType}`, err);
    }
  };

  const onUpdate = async () => {
    if (!selectedItem.value) return;
    const updatedItem: Partial<T> = {
      ...formData.value,
      ...(formData.value.dateString && formData.value.timeString
        ? { date: buildDateTimeMySQL(formData.value.dateString, formData.value.timeString) }
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

  return { onSubmit, onUpdate };
}

export function usePanelUtilities<T extends Record<string, any>>({
  formData,
  selectedItem,
  confirmation,
  fileInputRef,
}: {
  formData: Ref<Partial<T>>,
  selectedItem: Ref<T | null>,
  confirmation: Ref<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'warning' }>,
  fileInputRef: Ref<HTMLInputElement | null>,
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

  // Maneja la subida de imágenes (jpg, png, webp)
  const handleImageUpload = (e: any, fieldName: string) => {
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

      const reader = new FileReader();
      reader.onload = () => {
        if (!formData.value || typeof formData.value !== 'object') {
          formData.value = {} as Partial<T>;
        }
        formData.value[fieldName] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja la subida de archivos PDF
  const handlePdfUpload = (e: any, fieldName: string) => {
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
        if (!formData.value || typeof formData.value !== 'object') {
          formData.value = {} as Partial<T>;
        }
        formData.value[fieldName] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  const clearFileInput = () => {
    if (fileInputRef.value) fileInputRef.value.value = '';
  };

  const removeFileFromFormData = (fieldName: string) => {
    formData.value[fieldName] = '';
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
