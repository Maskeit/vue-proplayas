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