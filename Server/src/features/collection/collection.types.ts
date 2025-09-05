export interface SavedPosts {
    id: string
    userId: string
    postId: string
    collectionId: string
    createdAt: Date
    updatedAt: Date
}
export interface CollectionData {
    name: string
    description?: string
}

export interface CollectionDTO {
    id: string
    name: string
    description: string | null
    userId: string
    savedPosts?: SavedPosts[]
    createdAt: Date
    updatedAt: Date
}
