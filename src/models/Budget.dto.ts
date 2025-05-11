type BudgetItem = {
    readonly amount: number,
    readonly categoryId: string,
    readonly subcategoryId: string | null
};

export type Budget = {
    readonly id: string,
    readonly items: BudgetItem[]
};