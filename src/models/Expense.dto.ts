import { StorageStatus } from "../common/types"

export type Expense = {
    readonly id: string,
    amount: number,
    date: Date,
    description: string,
    categoryId: string,
    subcategoryId: string | null,
    status?: StorageStatus,
    paymentType?: string,
    months?: number,
    creditOperationId?: string | null,
}

/**
 * Dto to insert in DB
 */
export type NewExpense = Omit<Expense, 'id'>;