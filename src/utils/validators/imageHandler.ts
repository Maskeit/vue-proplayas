// un manejador de archivos como handleDrop o handleChange para imagenes
// aqui recibir el archivo y formatearlo, tambien recibir como argumento al donde se va emitir
// src/utils/imageHandler.ts

export const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

export const base64ToBlob = (base64: string): Blob => {
    const [header, data] = base64.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || '';
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
};

export const createFormDataFromBase64 = (base64: string, fieldName = "file", filename = "image.jpg"): FormData => {
    const blob = base64ToBlob(base64);
    const formData = new FormData();
    formData.append(fieldName, blob, filename);
    return formData;
};

export const validateImageFile = (file: File, maxSizeMB = 5): { valid: boolean, message?: string } => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
        return { valid: false, message: "Formato no permitido. Usa JPEG, PNG, WEBP o GIF." };
    }
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        return { valid: false, message: `El archivo supera los ${maxSizeMB}MB permitidos.` };
    }
    return { valid: true };
};