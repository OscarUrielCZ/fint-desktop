import { useState, useEffect } from "react";

import { StorageStatus } from "../common/types.ts";

import { Expense } from "../models/Expense.dto.ts";
import FirebaseFintService from "../services/FirebaseFintService.ts";
import { CategoriesMap } from "../models/Category.dto.ts";

function useStorage(storageName: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<CategoriesMap>({});

    const service = new FirebaseFintService();

    
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
            };
        } else {
            parsedData = JSON.parse(storage);
        }

        setExpenses(parsedData.expenses.map(expense => ({ ...expense, date: new Date(expense.date) }))); // TODO: replace this date casting
        setCategories(parsedData.categories);
    };

    const saveToLocalStorage = (expenses: Expense[], categories: CategoriesMap) => {
        const data = {
            expenses,
            categories,
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

        // update and save data
        setExpenses(expenseList);
        setCategories(categoriesData);
        saveToLocalStorage(expenseList, categoriesData);
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
        saveToLocalStorage(updatedExpenses, categories);
    };

    const insertExpense = (expense: Expense): void => {
        expense.status = StorageStatus.NEW;
        const newExpenses: Expense[] = [ ...expenses, expense ];
        setExpenses(newExpenses);
        saveToLocalStorage(newExpenses, categories);
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
        saveToLocalStorage(updatedExpenses, categories);
    };

    return { expenses, categories, loading,
        insertExpense, deleteExpense, updateExpense, syncData };
}

export default useStorage;