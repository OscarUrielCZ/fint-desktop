import React, { useState, useEffect, createContext } from 'react';

import useFirestore from '../hooks/useFirebase';
// import useStorage from '../hooks/useStorage';

const ExpensesContext = createContext();
// const STORAGE_ID = 'fint_V1';
const EXPENSES_COLLECTION = "expenses";

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
	// const [expenses, setExpenses] = useState([]);

	useEffect(() => {
        // getExpenses();
		
    }, []);

	// const {expenses, setExpenses, loading, error } = useStorage(STORAGE_ID, []);
	const { 
		getAllCollections,
		expenses,
		categories,
		loading, 
		error } = useFirestore(EXPENSES_COLLECTION);
	
		const updateData = () => {
			// eliminando registros pendientes
			// editando registros pendientes
			// agregando registros pendientes
	
			// trayendo información
			getAllCollections();	
		};

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
	
	const getExpenses = async () => {
		// const allExpenses = await getAllDocuments();
		// setExpenses(allExpenses);
	};
		
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
			categories,
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