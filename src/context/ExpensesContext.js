import React, { useState, createContext } from 'react';

import useStorage from '../hooks/useStorage';

const ExpensesContext = createContext();

function ExpensesProvider(props) {
    const STORAGE_ID = 'fint_V1';

    const [openModal, setOpenModal] = useState(false);
    const {expenses, setExpenses, loading, error } = useStorage(STORAGE_ID, []);
    const [searchValue, setSearchValue] = useState('');

    const expensesFound = searchValue.length === 0 ? 
        expenses : 
        expenses.filter(exp => {
            const searchText = searchValue.toLowerCase();
            const descText = exp.desc.toLowerCase();

            return descText.includes(searchText);
        });

    const addExpense = expense => {
        let newExpenses = [...expenses];
        newExpenses.push(expense);
        setExpenses(newExpenses);
    }

    const deleteExpense = id => {
        const newExpenses = expenses.filter(exp => exp.id !== id);
        setExpenses(newExpenses);
    };

    return (
        <ExpensesContext.Provider value={{
            expensesFound,
            addExpense,
            deleteExpense,
            searchValue,
            setSearchValue,
            loading,
            error,
            openModal,
            setOpenModal
        }}>
            {props.children}
        </ExpensesContext.Provider>
    );
}

export { ExpensesContext , ExpensesProvider };