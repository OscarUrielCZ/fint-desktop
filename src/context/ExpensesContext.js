import React, { useState, createContext } from 'react';

import useFirestore from '../hooks/useFirebase';
// import useStorage from '../hooks/useStorage';

const ExpensesContext = createContext();
// const STORAGE_ID = 'fint_V1';

const defaultExpense = () => {
	const curdate = new Date();
    let month = curdate.getMonth() + 1;
    if(month < 10)
        month = '0'+month;
	return {
		desc: '',
		type: '',
		amount: '',
		date: `${curdate.getFullYear()}-${month}-${curdate.getDate()}`
	};
}

function ExpensesProvider(props) {
	const [formExpense, setFormExpense] = useState(defaultExpense());
	const [openModal, setOpenModal] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	// const {expenses, setExpenses, loading, error } = useStorage(STORAGE_ID, []);
	const { expenses, addExpense, deleteExpense, updateExpense, loading, error } = useFirestore();
	
	const openUpdateExpenseModal = expense => {
		setFormExpense(expense);
		setOpenModal(true);
	}

	const expensesFound = searchValue.length === 0 ? 
		expenses : 
		expenses.filter(exp => {
			const searchText = searchValue.toLowerCase();
			const descText = exp.desc.toLowerCase();

			return descText.includes(searchText);
		});

	return (
		<ExpensesContext.Provider value={{
			expensesFound,
			addExpense,
			deleteExpense,
			updateExpense,
			searchValue,
			setSearchValue,
			loading,
			error,
			openModal,
			setOpenModal,
			formExpense,
			openUpdateExpenseModal
		}}>
			{props.children}
		</ExpensesContext.Provider>
	);
}

export { ExpensesContext , ExpensesProvider };