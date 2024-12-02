import { User } from './User'

export interface Blog {
    id: string
    title: string
    content: string
    authorId: string
    author: User
    image: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
}
