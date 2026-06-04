import { useState, useEffect } from "react";

import { StorageStatus } from "../common/types.ts";

import { Expense } from "../models/Expense.dto.ts";
import FirebaseFintService from "../services/FirebaseFintService.ts";
import { CategoriesMap } from "../models/Category.dto.ts";
import { Budget } from "../models/Budget.dto.ts";
import { useAuth } from "./useAuth.ts";
import { sortCategoriesMap } from "../common/utils.ts";

let service: FirebaseFintService;

// TODO: check all functions that are not part of the storage hook
//       e.g. insert expense does more than just intreracting with storage, sets expenses state which should be in a context shared, not here
//          implementing the correct function `save` agnostic to the user, and internally save to the desired storage (localStorage or DB)
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

        
        setExpenses(parsedData.expenses
            .map(expense => ({ ...expense, date: new Date(expense.date) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime())
        );
        setCategories(sortCategoriesMap(parsedData.categories));
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
        const sortedCategories = sortCategoriesMap(categoriesData);
        setCategories(sortedCategories);
        setBudget(finalBudget);
        saveToLocalStorage(expenseList, sortedCategories, finalBudget as Budget);
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
        const newExpenses: Expense[] = [ expense, ...expenses ];
        setExpenses(newExpenses);
        saveToLocalStorage(newExpenses, categories, budget as Budget);
    };

    const saveMany = (expensesToSave: Expense[]) => {
        const currentExpenses = [...expenses]; // TODO: this should be taken from the context once this TODO above all is complete
        const updatedExpenses = [...currentExpenses, ...expensesToSave];
        setExpenses(updatedExpenses); // TODO: this should be set in the context once this TODO above all is complete
        saveToLocalStorage(updatedExpenses, categories, budget as Budget);
    }

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
        insertExpense, deleteExpense, updateExpense, saveMany, syncData };
}

export default useStorage;