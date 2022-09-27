import React, { useContext } from 'react';

import './App.css';
import image from './coins.png';

import { ExpensesContext } from './context/ExpensesContext';
import Modal from './modals/Modal';

import ExpenseSearch from './components/ExpenseSearch';
import ExpenseList from './components/ExpenseList';
import ExpenseItem from './components/ExpenseItem';
import AddButton from './components/AddButton';
import AddExpenseForm from './components/AddExpenseForm';
import LoadingExpenses from './components/LoadingExpenses';

function AppUI() {
    const {
        error,
        loading,
        expensesFound,
        openModal
    } = useContext(ExpensesContext);

    return (
        <div className="App">
            <div className="App-left">
                <ExpenseSearch />
                <img src={image} alt="Imagen de criptomonedas" className="App-image" />
            </div>
            <div className="App-right">
                <ExpenseList>
                    {error && <p>Hubo un problema :(</p>}
                    
                    { loading && 
                        <LoadingExpenses />
                    }

                    {!loading && !error && expensesFound.length === 0 && <p>Sin datos. Agrega uno nuevo</p>}

                    {expensesFound.map(exp => (
                        <ExpenseItem
                            key={exp.id}
                            id={exp.id}
                            desc={exp.desc}
                            date={exp.date}
                            amount={exp.amount}
                            type={exp.type}
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
        </div>
    );
}

export default AppUI;