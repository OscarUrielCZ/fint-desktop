import { useState, useEffect } from "react";

import { StorageStatus } from "../common/types.ts";

import { Expense } from "../models/Expense.dto.ts";
import FirebaseFintService from "../services/FirebaseFintService.ts";
import { CategoriesMap } from "../models/Category.dto.ts";
import { Budget } from "../models/Budget.dto.ts";
import { useAuth } from "./useAuth.ts";

let service: FirebaseFintService;

function useStorage(storageName: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<CategoriesMap>({});
    const [budget, setBudget] = useState<Budget|null>(null);
    
    const { user } = useAuth() as any;

    if (user != null) {
        service = new FirebaseFintService(user.uid);
    }
    
    useEffect(() => {
        setLoading(true);
        retriveFromLocalStorage();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageName]);

    const retriveFromLocalStorage = () => {
        const storage = localStorage.getItem(storageName);
        let parsedData;

        if(storage == null) { // initialize data
            parsedData = {
                expenses: [],
                categories: {},
                budget: null
            };
        } else {
            parsedData = JSON.parse(storage);
        }

        setExpenses(parsedData.expenses.map(expense => ({ ...expense, date: new Date(expense.date) }))); // TODO: replace this date casting
        setCategories(parsedData.categories);
        setBudget(parsedData.budget);
    };

    const saveToLocalStorage = (expenses: Expense[], categories: CategoriesMap, budget: Budget) => {
        const data = {
            expenses,
            categories,
            budget
        };

        localStorage.setItem(storageName, JSON.stringify(data));
    }

    /**
     * Persists all data in DB
     */
    const syncData = async () => {
        // checks out each expense
        expenses.forEach(async expense => {
            if (expense.status) {   
                if (expense.status === StorageStatus.NEW) {
                    service.saveExpense(expense);
                } else if (expense.status === StorageStatus.UPDATED) {
                    service.updateExpense(expense);
                } else if (expense.status === StorageStatus.DELETED) {
                    service.removeExpense(expense.id);
                }
            }
        });

        const expenseList: Expense[] = await service.getExpenses();
        const categoriesData: CategoriesMap = await service.getCategories();
        // TODO: handle new budgets
        const budgetData: Budget | null = await service.getBudget().catch(() => null);
        let finalBudget = budgetData;

        if (budgetData == null) {
            finalBudget = service.buildBudget(categoriesData);
        }

        // update and save data
        setExpenses(expenseList);
        setCategories(categoriesData);
        setBudget(finalBudget);
        saveToLocalStorage(expenseList, categoriesData, finalBudget as Budget);
    }

    const deleteExpense = (id: string): void => {
        const updatedExpenses: Expense[] = [];

        expenses.forEach(expense => {
            if (expense.id === id) {
                if (expense.status !== StorageStatus.NEW) { // mark as deleted to persist in DB, but doesnt delete item yet
                    expense.status = StorageStatus.DELETED;
                    updatedExpenses.push(expense);
                }
            } else {
                updatedExpenses.push(expense);
            }
        });

        setExpenses(updatedExpenses);
        saveToLocalStorage(updatedExpenses, categories, budget as Budget);
    };

    const insertExpense = (expense: Expense): void => {
        expense.status = StorageStatus.NEW;
        const newExpenses: Expense[] = [ ...expenses, expense ];
        setExpenses(newExpenses);
        saveToLocalStorage(newExpenses, categories, budget as Budget);
    };

    const updateExpense = (updatedExpense: Expense): void => {
        const updatedExpenses: Expense[] = expenses.map(expense => {
            if (expense.id === updatedExpense.id) {
                if (expense.status !== StorageStatus.NEW)
                    updatedExpense.status = StorageStatus.UPDATED;
                return updatedExpense;
            }
            return expense;
        });
        setExpenses(updatedExpenses);
        saveToLocalStorage(updatedExpenses, categories, budget as Budget);
    };

    return { expenses, categories, budget, loading,
        insertExpense, deleteExpense, updateExpense, syncData };
}

export default useStorage;