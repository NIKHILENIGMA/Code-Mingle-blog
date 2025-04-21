// Pagination type

/**
 * Interface for pagination parameters
 * @interface PaginationParams
 * @property {number} [page] - The page number to retrieve
 * @property {number} [limit] - Number of items per page
 * @property {string} [sortBy] - Field name to sort by
 * @property {'asc' | 'desc'} [order] - Sort order direction (ascending or descending)
 */
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

// Filter type
/**
 * Interface for filter parameters
 * @interface FilterParams
 * @property {string} [search] - Search query string
 * @property {Date} [startDate] - Start date for filtering
 * @property {Date} [endDate] - End date for filtering
 * @property {string[]} [status] - Array of status values to filter by
 */
export interface FilterParams {
    search?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string[];
}

// Make all properties optional
/**
 * Utility type to make all properties of a type optional
 * @template T - The type to modify
 * @typedef {Partial<T>} Partial<T>
 * @property {T} [P] - The properties of the type T, made optional
 */
export type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Make all properties required

/**
 * Utility type to make all properties of a type required
 * @template T - The type to modify
 * @typedef {Required<T>} Required<T>
 * @property {T} [P] - The properties of the type T, made required
 */
export type Required<T> = {
    [P in keyof T]-?: T[P];
};

