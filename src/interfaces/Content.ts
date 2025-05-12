// Proyectos colaborativos de bajo costo
export interface Project{
    id: number;
    title: string;
    description: string;
    cover_image: string;
    date: Date;
    location: string;
    link: string;
    participants: string;
}

// Events
export interface Event {
    id: number;
    title: string;
    type: 'webinar' | 'congreso' | 'magistrado' | 'clase' | 'taller' | 'charla' | 'conferencia' | 'otro';
    description: string;
    date: Date;
    link: string;
    format: string;
    location: string | null;
    cover_image: string;
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