import { Budget } from "../models/Budget.dto";
import { CategoriesMap } from "../models/Category.dto";
import { Expense, NewExpense } from "../models/Expense.dto";
import IFintService from "./IFintService";

import { findAll as findExpenses, remove, save, update } from "../api/firebase/Expense.ts";
import { findAll as findCategories } from "../api/firebase/Category.ts";
import { findByUsername as FindBudgetByUsername } from "../api/firebase/Budget.ts";
import { createCategoryJson } from "../common/utils.ts";

class FirebaseFintService implements IFintService {
    getExpenses(): Promise<Expense[]> {
        return findExpenses();
    }
    async getCategories(): Promise<CategoriesMap> {
        return createCategoryJson(await findCategories());
    }
    getBudget(): Promise<Budget> {
        return FindBudgetByUsername("osqur");
    }

    removeExpense(id: string) {
        remove(id);
    }

    saveExpense(expense: Expense) {
        save({
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
            categoryId: expense.categoryId,
            subcategoryId: expense.subcategoryId
        } as NewExpense);
    }

    updateExpense(expense: Expense) {
        update(expense.id, {
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
            categoryId: expense.categoryId,
            subcategoryId: expense.subcategoryId
        } as NewExpense);
    }
}

export default FirebaseFintService;