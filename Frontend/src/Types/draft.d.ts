export interface Draft  {
    id: string,
    title?: string,
    content?: string,
    tags?: string[],
    category?: string,
    coverImageUrl?: string,
    isPublished?: boolean,
    publishedAt?: string,
    updatedAt?: string,
}