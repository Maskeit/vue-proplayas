// Proyectos colaborativos de bajo costo
export interface Projects{
    id: number;
    title: string;
    description: string;
    place: string;
    date: Date;
    image: string;
    link: string;
}

// Webinars
export interface Webinar {
    id: number;
    title: string;
    date: Date;
    description: string;
    organizer_type: string;
    organizer_id: number;
    link: string;
    format: string;
    location: string | null;
}

// sobre webseries
export interface Chapter {
    id: number;
    title: string;
    description: string;
    youtube_url: string; // solo el link de YouTube
    thumbnail_url: string; // preview de imagen
    episode_number?: number;
}

export interface Series {
    id: number;
    title: string;
    description: string;
    organizer_type: string;
    organizer_id: number;
    thumbnail_url: string;
    chapters: Chapter[];
}

// articulos
export interface Articles {
    id: number;
    type: string;
    title: string;
    description: string;
    links: string;
    doi: string;
    issn: string;
    file_path: string;
    cover_image: string;
}

// Libros
export interface Books {
    id: number;
    title: string;
    author: string | null;
    publication_date: Date | null;
    isbn: string | null;
    description: string | null;
    link: string | null;
    file_path: string | null;
    cover_image: string | null;
}