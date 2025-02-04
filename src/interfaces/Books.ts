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