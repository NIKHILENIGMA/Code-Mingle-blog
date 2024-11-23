//note Purpose: Interface for the Base Repository.

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>
    update(id: string | number, data: Partial<T>): Promise<T | null>
    delete(id: string | number): Promise<void>
}

