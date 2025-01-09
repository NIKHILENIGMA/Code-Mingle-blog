//note Purpose: Interface for the Base Repository.

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>
    update(where: Record<string, string | number> , data: Partial<T>): Promise<T | null>
    delete(where: Record<string, string | number>): Promise<void>
}

