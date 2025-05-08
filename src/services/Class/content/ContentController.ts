import axiosInstance from "@api";
import type { Webinar, Projects, Articles, Books } from "@interfaces/Content";

export class ContentController {


    // Events format
    async getEvents() { // traer todos los webinars
        const response = await axiosInstance.get("/webinars");
        const { status, message, data } = response.data;
        return { status, data };
    }
    async getEvent(id: number) { // traer un webinar por id
        const response = await axiosInstance.get(`/webinar/${id}`);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async newEvent(event: Webinar) { // crear un webinar requiere token jwt
        const response = await axiosInstance.post("/webinar", event);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async updateEvent(event: Webinar, id: number) { // actualizar un webinar por id
        const response = await axiosInstance.put(`/webinar/${id}`, event);
        const { status, message, data } = response.data;
        return { status, data };
    }
    async deleteEvent(id: number) { // eliminar un webinar por id
        const response = await axiosInstance.delete(`/webinar/${id}`);
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