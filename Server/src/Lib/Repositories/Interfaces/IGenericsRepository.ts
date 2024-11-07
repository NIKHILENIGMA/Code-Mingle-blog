//note Purpose: Interface for the Generics Repository.

export interface IGenericsRepository<T> {
    getAll(): Promise<T[]>
    getById(id: string): Promise<T | null>
    create(data: T): Promise<T>
    update(id: string, data: T): Promise<T | null>
    delete(id: string): Promise<void>
}

