export interface Webinars {
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