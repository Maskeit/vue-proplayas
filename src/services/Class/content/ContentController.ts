import axiosInstance from "@api";

export class ContentController {

    // traer todos los Contenidos depende el argumento pasado
    async getContent(content: string) { 
        const response = await axiosInstance.get(`/${content}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
        // traer todos los Contenidos depende el argumento pasado
    async getContentAuthor(content: string) { 
        const response = await axiosInstance.get(`/${content}/own`);
        const { status, message, data } = response.data;
        return { status, data };
    }

    // crear contenido genérico
    async createContent(content: string, payload: any) {
        const response = await axiosInstance.post(`/${content}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const { status, data } = response.data;
        return { status, data };
    }

    // actualizar contenido genérico
    async updateContent(content: string, id: number, payload: any) {
        const response = await axiosInstance.put(`/${content}/${id}`, payload);
        const { status, data } = response.data;
        return { status, data };
    }

    // eliminar contenido genérico
    async deleteContent(content: string, id: number) {
        const response = await axiosInstance.delete(`/${content}/${id}`);
        const { status, data } = response.data;
        return { status, data };
    }

    // cambiar estado del contenido (activo/inactivo) si aplica
    async toggleStatus(content: string, id: number) {
        const response = await axiosInstance.put(`/${content}/${id}/toggle-status`);
        const { status, data } = response.data;
        return { status, data };
    }

    // subir archivo
    async uploadFile(content: string, id: number, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post(`/${content}/${id}/upload-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const { status, data } = response.data;
        return { status, data };
    }

    // subir imagen
    async uploadImage(content: string, id: number, image: File) {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axiosInstance.post(`/${content}/${id}/upload-cover-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const { status, data } = response.data;
        return { status, data };
    }
}