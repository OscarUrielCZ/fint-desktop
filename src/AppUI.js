import React, { useContext } from 'react';

import AddButton from './components/AddButton/';
import AddExpenseForm from './components/AddExpenseForm/';
import ExpenseSearch from './components/ExpenseSearch/';
import ExpenseList from './components/ExpenseList/';
import ExpenseItem from './components/ExpenseItem/';
import LoadingExpenses from './components/LoadingExpenses/';
import ResumeExpenses from './components/ResumeExpenses/index.tsx';

import Modal from './modals/Modal';

import { ExpensesContext } from './context/ExpensesContext';

import './App.css';

function AppUI() {
    const {
        error,
        expenses,
        expensesFound,
        loading,
        openModal,
        updateData
    } = useContext(ExpensesContext);

    return (
        <div className="App">
            <div className='top-pinned'>
                <ExpenseSearch />
            </div>
            <div style={{ marginTop: '5.5rem', marginBottom: '2rem' }}>
                <ResumeExpenses expenses={expenses} />
            </div>
            <div style={{ marginBottom: '4rem' }}>
                <ExpenseList>
                    {error && <p>Hubo un problema :</p> }
                    
                    { loading && <LoadingExpenses /> }

                    {!loading && !error && expensesFound.length === 0 
                        && <p>Sin datos. Agrega uno nuevo</p> }

                    {expensesFound.map(exp => (
                        <ExpenseItem
                            key={exp.id}
                            expense={exp}
                        />
                    ))}
                </ExpenseList>

                { openModal && (
                    <Modal>
                        <AddExpenseForm />
                    </Modal>)
                }    

                <AddButton />
            </div>
            <div className='bottom-pinned'>
                <button className='btn-update' onClick={updateData}>
                    Actualizar información
                </button>
            </div>
        </div>
    );
}

export default AppUI;