import { Budget, BudgetItem } from "../models/Budget.dto";
import { CategoriesMap } from "../models/Category.dto";
import { Expense, NewExpense } from "../models/Expense.dto";
import IFintService from "./IFintService";

import { findAll as findExpenses, remove, save, update } from "../api/firebase/Expense.ts";
import { findAll as findCategories } from "../api/firebase/Category.ts";
import { findByUserId as findBudgetByUserId } from "../api/firebase/Budget.ts";
import { createCategoryJson } from "../common/utils.ts";

class FirebaseFintService implements IFintService {
    userId: string;
    constructor(userId: string) {
        this.userId = userId;
    }

    getExpenses(): Promise<Expense[]> {
        return findExpenses(this.userId);
    }
    async getCategories(): Promise<CategoriesMap> {
        return createCategoryJson(await findCategories());
    }
    getBudget(): Promise<Budget> {
        return findBudgetByUserId(this.userId);
    }

    removeExpense(id: string) {
        remove(id);
    }

    saveExpense(expense: Expense) {
        save({
            userId: this.userId,
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
            categoryId: expense.categoryId,
            subcategoryId: expense.subcategoryId
        } as NewExpense);
    }

    updateExpense(expense: Expense) {
        update(expense.id, {
            userId: this.userId,
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
            categoryId: expense.categoryId,
            subcategoryId: expense.subcategoryId
        } as NewExpense);
    }

    buildBudget(categories: CategoriesMap): Budget {
        const budgetItems: BudgetItem[] = [];

        for (const [categoryId, categoryData] of Object.entries(categories)) {
            if (categoryData.subcategories == null) {
                budgetItems.push({
                    amount: 0,
                    categoryId: categoryId,
                    subcategoryId: null
                })       
            } else {
                // TODO: check _ varaible
                for (const [subcategoryId, _] of Object.entries(categoryData.subcategories)) {
                    budgetItems.push({
                        amount: 0,
                        categoryId: categoryId,
                        subcategoryId: subcategoryId
                    });
                }
            }
        }

        return {
            id: "tempo",
            items: budgetItems
        }
    }
}

export default FirebaseFintService;