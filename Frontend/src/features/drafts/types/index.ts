export interface Draft  {
    id: string,
    title?: string,
    content?: string,
    image?: string,
    tags?: string[],
    category?: string,
    thambnail?: string,
    isPublished?: boolean,
    publishedAt?: string,
    updatedAt?: string,
}