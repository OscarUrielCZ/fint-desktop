import { useState, useEffect } from 'react';
import useFirestore from './useFirebase';

function useStorage(storageName) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    const { getAllCollections } = useFirestore();

    // fetching data
    useEffect(() => {
        setTimeout(() => {
            try {
                const storage = localStorage.getItem(storageName);
                let parsedData;
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
        const { expenses: dbExpenses, categories: dbCategories } = await getAllCollections();

        // corroborar cambios

        // guardar cambios
        setExpenses(dbExpenses);
        setCategories(dbCategories);
        saveData(dbExpenses, dbCategories);
    }

    const saveData = (expenses, categories) => {
        const data = {
            expenses,
            categories
        };

        localStorage.setItem(storageName, JSON.stringify(data));
    }

    return { expenses, categories, updateData, loading, error };
}

export default useStorage;