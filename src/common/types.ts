export enum StorageStatus {
    NEW,
    UPDATED,
    DELETED
}

export enum Period {
    WEEK,
    MONTH,
    YEAR,
    FULL
}

export type Expense = {
    id: string,
    amount: number,
    date: Date,
    category: string,
    subcategory?: string,
    description: string,
    status?: StorageStatus
}

export interface Category {
    id: string,
    value: string,
    displayValue: string,
    subcategories?: Category[]
}