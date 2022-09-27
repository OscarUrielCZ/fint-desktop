import { useState, useEffect } from 'react';

function useStorage(storageName, initialValue) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState(initialValue);

    // fetching data
    useEffect(() => {
        setTimeout(() => {
            try {
                const storage = localStorage.getItem(storageName);
                let parsedData;
                if(storage == null) {
                    localStorage.setItem(storageName, JSON.stringify(initialValue));
                    parsedData = initialValue;
                } else {
                    parsedData = JSON.parse(storage);
                }
                setExpenses(parsedData);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }, 1500);
    }, [storageName, initialValue]);

    const saveExpenses = expenses => {
        setExpenses(expenses);
        localStorage.setItem(storageName, JSON.stringify(expenses));
    }

    return { expenses, setExpenses: saveExpenses, loading, error };
}

export default useStorage;