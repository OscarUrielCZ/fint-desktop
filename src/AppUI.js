import React, { useContext } from 'react';

import { ExpensesContext } from './context/ExpensesContext';
import Modal from './modals/Modal';

import ExpenseSearch from './components/ExpenseSearch/';
import ExpenseList from './components/ExpenseList/';
import ExpenseItem from './components/ExpenseItem/';
import AddButton from './components/AddButton/';
import AddExpenseForm from './components/AddExpenseForm/';
import LoadingExpenses from './components/LoadingExpenses/';

import './App.css';

function AppUI() {
    const {
        error,
        loading,
        expensesFound,
        openModal,
        updateData
    } = useContext(ExpensesContext);

    return (
        <div className="App">
            <div>
                <ExpenseSearch />
            </div>
            <div>
                <ExpenseList>
                    {error && <p>Hubo un problema :</p>}
                    
                    { loading && 
                        <LoadingExpenses />
                    }

                    {!loading && !error && expensesFound.length === 0 && <p>Sin datos. Agrega uno nuevo</p>}

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