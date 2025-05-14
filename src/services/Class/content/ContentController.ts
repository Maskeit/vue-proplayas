import axiosInstance from "@api";
import type { Event, Projects, Articles, Books } from "@interfaces/Content";

export class ContentController {


    // Events format
    async getEvents() { // traer todos los Eventos
        const response = await axiosInstance.get("/events");
        const { status, message, data } = response.data;
        return { status, data };
    }
    async getEvent(id: number) { // traer un Event por id
        const response = await axiosInstance.get(`/event/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async newEvent(event: Event) { // crear un Event requiere token jwt
        let payload: any;
        let headers: any = {};
        const hasImage = event.cover_image && event.cover_image.startsWith('data:image/');
        if (hasImage) {
            payload = new FormData();
            for (const [key, value] of Object.entries(event)) {
                // La imagen debe convertirse desde base64 a Blob antes de añadir
                if (key === 'cover_image' && typeof value === 'string') {
                    const blob = await (await fetch(value)).blob();
                    payload.append('cover_image', blob, 'cover_image.webp'); // puedes mejorar el nombre y tipo
                } else {
                    payload.append(key, value ?? '');
                }
            }            
        } else {
            // Si no hay imagen, se envía como JSON
            payload = event;
            headers['Content-Type'] = 'application/json';
        }
        const response = await axiosInstance.post("/event", payload, { headers });
        const { status, message, data } = response.data;
        return { status, data };
    }
    async updateEvent(event: Event, id: number) { // actualizar un Event por id
        const response = await axiosInstance.put(`/event/${id}`, event);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async deleteEvent(id: number) { // eliminar un Event por id
        const response = await axiosInstance.delete(`/event/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }





    // PCBC (Proyectos Colaborativos de Bajo Costo)
    async getPCBC() { // traer todos los PCBC
        const response = await axiosInstance.get("/proyectos");
        const { status, message, data } = response.data;
        return { status, data };
    }
    async getPCBCById(id: number) { // traer un PCB por id
        const response = await axiosInstance.get(`/proyecto/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async updatePCBC(pcb: Projects, id: number) { // actualizar un PCB por id
        const response = await axiosInstance.put(`/proyecto/${id}`, pcb);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async deletePCBC(id: number) { // eliminar un PCB por id
        const response = await axiosInstance.delete(`/proyecto/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async newPCBC(pcb: Projects) { // crear un PCB requiere token jwt
        const response = await axiosInstance.post("/proyecto", pcb);
        const { status, message, data } = response.data;
        return { status, data };
    }



    

    // Libros
    async getBooks() { // traer todos los libros
        const response = await axiosInstance.get("/books");
        const { status, message, data } = response.data;
        return { status, data };
    }
    async getBook(id: number) { // traer un libro por id
        const response = await axiosInstance.get(`/book/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async updateBook(book: Books, id: number) { // actualizar un libro por id
        const response = await axiosInstance.put(`/book/${id}`, book);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async deleteBook(id: number) { // eliminar un libro por id
        const response = await axiosInstance.delete(`/book/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async newBook(book: Books) { // crear un libro requiere token jwt
        const response = await axiosInstance.post("/book", book);
        const { status, message, data } = response.data;
        return { status, data };
    }

    // Articulos
    async newArticulo(publication: Articles) {
        const response = await axiosInstance.post("/article", publication);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async getArticulos() {
        const response = await axiosInstance.get("/articles");
        const { status, message, data } = response.data;
        return { status, data };
    }
    async getArticulo(id: number) {
        const response = await axiosInstance.get(`/article/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async updateArticulo(publication: Articles, id: number) {
        const response = await axiosInstance.put(`/article/${id}`, publication);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async deleteArticulo(id: number) {
        const response = await axiosInstance.delete(`/article/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }


    newSerie(series: Series) {
        const response = axiosInstance.post("/serie", series);
        const { status, message, data } = response.data;
        return { status, data };
    }
}