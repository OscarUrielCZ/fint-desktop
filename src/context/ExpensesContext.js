import React, { useState, createContext } from 'react';
import moment from 'moment';

import useExpensesStorage from '../hooks/useExpensesStorage.ts';

import { castFirebaseDate } from '../utils.ts';
import { StorageStatus } from '../common/types.ts'; 

const ExpensesContext = createContext();
const STORAGE_ID = 'fint_V2';

const defaultExpense = {
	category: '',
	subcategory: '',
	description: '',
	amount: '',
	date: moment(new Date()).format("YYYY-MM-DD")
};

function ExpensesProvider(props) {
	const [formExpense, setFormExpense] = useState(defaultExpense);
	const [openModal, setOpenModal] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const { categories, error, expenses, loading,
		deleteExpense, insertExpense, updateData, updateExpense } = useExpensesStorage(STORAGE_ID);

	const clearExpenseForm = () => {
		setFormExpense(defaultExpense);
	};

	const openUpdateExpenseModal = expense => {
		expense.date = castFirebaseDate(expense.date);
		console.log(expense);

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
			categories,
			error,
			expenses,
			expensesFound,
			formExpense,
			loading,
			openModal,
			searchValue,

			clearExpenseForm,
			deleteExpense,
			insertExpense,
			openUpdateExpenseModal,
			setOpenModal,
			setSearchValue,
			updateData,
			updateExpense
		}}>
			{props.children}
		</ExpensesContext.Provider>
	);
}

export { ExpensesContext , ExpensesProvider };