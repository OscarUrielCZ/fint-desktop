export enum StorageStatus {
    DELETED,
    NEW,
    UPDATED,
}

export enum Period {
    MONTH,
    YEAR,
    FULL
}

// TODO: revisar tipos de Expense (de creacion, actualizacion, etc)
export type Expense = {
    id: string,
    amount: number,
    date: Date,
    category?: string,
    description: string,
    status?: StorageStatus,
    categoryId?: string,
    subcategoryId?: string
}

export type Category = {
    id: string,
    value: string,
    displayValue: string,
    subcategories?: { [key: string]: Category }
};