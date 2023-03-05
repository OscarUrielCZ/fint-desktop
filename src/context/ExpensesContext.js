import React, { useState, createContext } from 'react';
import useExpensesStorage from '../hooks/useExpensesStorage.ts';

import { StorageStatus } from '../common/types.ts'; 
const ExpensesContext = createContext();
const STORAGE_ID = 'fint_V2';

const defaultExpense = () => {
	const currdate = new Date();
    let month = currdate.getMonth() + 1;
    if(month < 10)
        month = '0'+month;
	return {
		category: '',
		subcategory: '',
		description: '',
		amount: '',
		date: `${currdate.getFullYear()}-${month}-${currdate.getDate()}`
	};
}

function ExpensesProvider(props) {
	const [formExpense, setFormExpense] = useState(defaultExpense());
	const [openModal, setOpenModal] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const { error, loading, expenses, categories,
		updateData, insertExpense, deleteExpense, updateExpense } = useExpensesStorage(STORAGE_ID);
		
	const openUpdateExpenseModal = expense => {
		setFormExpense(expense);
		setOpenModal(true);
	}

	let expensesFound = searchValue.length === 0 ? 
		expenses : 
		expenses.filter(exp => {
			const searchText = searchValue.toLowerCase();
			const descText = exp.description.toLowerCase();

			return descText.includes(searchText);
		});
	expensesFound = expensesFound.filter(expense => expense.status !== StorageStatus.DELETED);

	return (
		<ExpensesContext.Provider value={{
			loading,
			error,
			openModal,
			formExpense,
			expensesFound,
			expenses,
			searchValue,
			setSearchValue,
			setOpenModal,
			openUpdateExpenseModal,
			updateData,
			insertExpense,
			deleteExpense,
			updateExpense
		}}>
			{props.children}
		</ExpensesContext.Provider>
	);
}

export { ExpensesContext , ExpensesProvider };