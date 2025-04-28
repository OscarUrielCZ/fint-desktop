import { StorageStatus } from "../common/types"

export type Expense = {
    readonly id: string,
    amount: number,
    date: Date,
    description: string,
    categoryId: string | null,
    subcategoryId: string | null,
    status?: StorageStatus
}

/**
 * Dto to insert in DB
 */
export type NewExpense = Omit<Expense, 'id'>;