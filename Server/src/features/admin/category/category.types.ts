
/**
 * Schema for creating a new category.
 * 
 * @property {string} name - The name of the category.
 */
export interface CreateCategory {
    name: string
}

/**
 * Schema for finding a category.
 * 
 * @property {number} id - The ID of the category.
 */
export interface CategoryWhere {
    id: number
}

/**
 * Schema for updating a category.
 * 
 * @property {string} name - The new name of the category.
 */
export interface UpdateCategory {
    name: string
}

/**
 * Schema for a category.
 * 
 * @property {number} id - The ID of the category.
 * @property {string} name - The name of the category.
 * @property {Date} createdAt - The date and time the category was created.
 * @property {Date} updatedAt - The date and time the category was last updated.
 */
export interface CategoryDTO {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
}
