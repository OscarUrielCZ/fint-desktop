export enum StorageStatus {
    NEW,
    UPDATED,
    DELETED
}

export enum Period {
    MONTH,
    YEAR,
    FULL
}

export type Expense = {
    id: string,
    amount: number,
    date: Date,
    category: string,
    description: string,
    status?: StorageStatus
}