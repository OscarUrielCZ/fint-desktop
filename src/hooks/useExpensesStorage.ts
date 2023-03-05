import { useState, useEffect } from 'react';

import useFirestore from './useFirestore.ts';
import { Category, Expense, StorageStatus } from '../common/types.ts';

function useExpensesStorage(storageName: string) {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const { getAllCollections, insertDocument, 
        deleteDocument, updateDocument } = useFirestore();

    useEffect(() => {
        setTimeout(() => {
            try {
                const storage: any = localStorage.getItem(storageName);
                let parsedData: any;
                if(storage == null) {
                    parsedData = {
                        expenses: [],
                        categories: []
                    };
                    localStorage.setItem(storageName, JSON.stringify(parsedData));
                } else {
                    parsedData = JSON.parse(storage);
                }
                setExpenses(parsedData.expenses);
                setCategories(parsedData.categories);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }, 1500);
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
                let tempExpense = expense;
                delete tempExpense.id;
                delete tempExpense.status;
                await updateDocument(tempExpense.id, tempExpense);
            }
        });

        const { expenses: dbExpenses, 
            categories: dbCategories } = await getAllCollections();

        // guardar cambios
        setExpenses(dbExpenses);
        setCategories(dbCategories);
        saveData(dbExpenses, dbCategories);
    }

    const saveData = (expenses: Expense[], categories: Category[]): void => {
        const data: object = {
            expenses,
            categories
        };

        localStorage.setItem(storageName, JSON.stringify(data));
    }

    const insertExpense = (expense: Expense): void => {
        expense.status = StorageStatus.NEW;
        const newExpenses: Expense[] = [
            ...expenses,
            expense
        ];
        setExpenses(newExpenses);
        saveData(newExpenses, categories);
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

        setExpenses(updatedExpenses.filter(expense => expense.status !== StorageStatus.DELETED ));
        saveData(updatedExpenses, categories);
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
        saveData(updatedExpenses, categories);
    };

    return { expenses, categories, loading, error,
        insertExpense, deleteExpense, updateExpense, updateData };
}

export default useExpensesStorage;