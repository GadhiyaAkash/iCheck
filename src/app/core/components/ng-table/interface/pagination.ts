export interface Pagination {
    page: number;
    per_page: number;
    maxSize?: number;
    numPages?: number;
    length: number;
}

export const PaginationLimit: Array<any> = [5, 10, 20, 50, 100];