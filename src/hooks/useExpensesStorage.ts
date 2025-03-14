import { useState, useEffect } from 'react';

import useFirestore from './useFirestore.ts';
import { Category, Expense, StorageStatus } from '../common/types.ts';

function useExpensesStorage(storageName: string) {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [categoriesAux, setCategoriesAux] = useState<{[key: string]: Category}>({});

    const { getCategories, getExpenses, insertDocument, 
        deleteDocument, updateDocument } = useFirestore();

    useEffect(() => {
        setTimeout(() => {
            try {
                const storage: any = localStorage.getItem(storageName);
                let parsedData: any;
                if(storage == null) {
                    parsedData = {
                        expenses: [],
                        categories: [],
                        categoriesAux: {}
                    };
                    localStorage.setItem(storageName, JSON.stringify(parsedData));
                } else {
                    parsedData = JSON.parse(storage);
                }
                setExpenses(parsedData.expenses.map(expense => ({ ...expense, date: new Date(expense.date) })));
                setCategories(parsedData.categories);
                setCategoriesAux(parsedData.globalCategories);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }, 500);
    }, [storageName]);

    const updateData = async () => {
        // corroborar cambios
        expenses.forEach(async expense => {
            if (expense.status === StorageStatus.NEW) {
                let tempExpense = expense;
                delete tempExpense.id;
                delete tempExpense.status;
                await insertDocument(tempExpense);
            } else if (expense.status === StorageStatus.DELETED) {
                await deleteDocument(expense.id);
            } else if (expense.status === StorageStatus.UPDATED) {
                let tempExpense: Expense = expense;
                const id: string = tempExpense.id;
                delete tempExpense.id;
                delete tempExpense.status;
                await updateDocument(id, tempExpense);
            }
        });

        const expenseList = await getExpenses();
        const categoryData = await getCategories();

        // categorias
        const dbCategories: string[] = [...new Set(expenses.map(expense => expense.category))];

        // update and save data
        setExpenses(expenseList);
        setCategories(dbCategories);
        setCategoriesAux(categoryData);

        saveData(expenseList, dbCategories, categoryData);
    }

    const saveData = (expenses: Expense[], categories: string[], globalCategories: {[key: string]: Category}): void => {
        const data: object = {
            expenses,
            categories,
            globalCategories
        };

        localStorage.setItem(storageName, JSON.stringify(data));
    }

    const insertExpense = (expense: Expense): void => {
        expense.status = StorageStatus.NEW;
        const newExpenses: Expense[] = [
            ...expenses,
            expense
        ];
        let newCategories: string[] = categories;

        setExpenses(newExpenses);
        
        saveData(newExpenses, newCategories, categoriesAux);
    };

    const deleteExpense = (id: string): void => {
        const updatedExpenses: Expense[] = [];

        expenses.forEach(expense => {
            if (expense.id === id) {
                if (expense.status !== StorageStatus.NEW) {
                    expense.status = StorageStatus.DELETED;
                    updatedExpenses.push(expense);
                }
            } else {
                updatedExpenses.push(expense);
            }
        });

        setExpenses(updatedExpenses);
        saveData(updatedExpenses, categories, categoriesAux);
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
        saveData(updatedExpenses, categories, categoriesAux);
    };

    return { expenses, categories, categoriesAux, loading, error,
        insertExpense, deleteExpense, updateExpense, updateData };
}

export default useExpensesStorage;