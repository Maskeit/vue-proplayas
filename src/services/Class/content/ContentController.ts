import axiosInstance from "@api";
import { system } from '@service/system';
import type { Webinar } from "@interfaces/Webinars";
import type { Series } from "@interfaces/Series";
import type { Books } from "@interfaces/Books";
import type { Publications } from "@interfaces/Publications";

export class ContentController {

    newWebinar(webinar: Webinar) {
        const response = axiosInstance.post("/webinar", webinar);
        const { status, message, data } = response.data;
        return { status, data };
    }
    newSerie(series: Series) {
        const response = axiosInstance.post("/serie", series);
        const { status, message, data } = response.data;
        return { status, data };
    }
    newBook(book: Books) {
        const response = axiosInstance.post("/book", book);
        const { status, message, data } = response.data;
        return { status, data };
    }
    newArticulo(publication: Publications) {
        const response = axiosInstance.post("/article", publication);
        const { status, message, data } = response.data;
        return { status, data };
    }
    newProject(project: Projects) {
        const response = axiosInstance.post("/project", project);
        const { status, message, data } = response.data;
        return { status, data };
    }
}