import React, { useState, createContext } from 'react';

import useStorage from '../hooks/useStorage';

const ExpensesContext = createContext();
const STORAGE_ID = 'fint_V2';

const defaultExpense = () => {
	const currdate = new Date();
    let month = currdate.getMonth() + 1;
    if(month < 10)
        month = '0'+month;
	return {
		desc: '',
		type: '',
		amount: '',
		date: `${currdate.getFullYear()}-${month}-${currdate.getDate()}`
	};
}

function ExpensesProvider(props) {
	const [formExpense, setFormExpense] = useState(defaultExpense());
	const [openModal, setOpenModal] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const {expenses, updateData, loading, error } = useStorage(STORAGE_ID);

	const addExpense = (expense) => {
		// addDocument(expense);
		// getExpenses();
	};

	const deleteExpense = async (id) => {
		// await deleteDocument(id)
		// getExpenses();
	};

	const updateExpense = async (id, expense) => {
		;
	};
	
	//const getExpenses = async () => {
		// const allExpenses = await getAllDocuments();
		// setExpenses(allExpenses);
	//};
		
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
			expenses,
			addExpense,
			deleteExpense,
			updateExpense,
			searchValue,
			setSearchValue,
			loading,
			error,
			openModal,
			formExpense,
			setOpenModal,
			openUpdateExpenseModal,
			updateData
		}}>
			{props.children}
		</ExpensesContext.Provider>
	);
}

export { ExpensesContext , ExpensesProvider };