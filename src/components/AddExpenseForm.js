import React, { useState, useContext } from 'react';

import './AddExpenseForm.css';

import { ExpensesContext } from '../context/ExpensesContext';

function AddExpenseForm() {
    const curdate = new Date();
    let month = curdate.getMonth() + 1;
    if(month < 10)
        month = '0'+month;

    const { setOpenModal, addExpense } = useContext(ExpensesContext);
    const [expense, setExpense] = useState({
        desc: '',
        type: '',
        amount: '',
        date: `${curdate.getFullYear()}-${month}-${curdate.getDate()}`
    });

    const generateHash = text => {
        const p = 45397489; // prime number
        let id = 0;
        for(let i=0; i<text.length; i++)
            id += (p*text.charCodeAt(i));

        return id;
    };

    const onChange = e => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const onCancel = () => {
        setOpenModal(false);
    };

    const onSubmit = event => {
        event.preventDefault();
        const id = generateHash(expense.desc);
        console.log(id);
        addExpense({
            ...expense,
            id
        });
        setOpenModal(false);
    };
    return (
        <form onSubmit={onSubmit} className="AddExpenseForm">
            <h3>Agrega un gasto</h3>
            <input
                onChange={onChange}
                value={expense.desc}
                name="desc"
                type="text"
                placeholder="Descripción"
                required />
            <input 
                onChange={onChange}
                value={expense.type}
                name="type"
                type="text"
                placeholder="Categoría" 
                required/>
            <input 
                onChange={onChange}
                value={expense.amount}
                name="amount"
                type="number"
                placeholder="Cantidad ($)"
                required />
            <input 
                onChange={onChange}
                value={expense.date}
                name="date"
                type="date" 
                placeholder="Fecha"
                required />
            <div className="buttons">
                <button onClick={onCancel} type="button" className="cancel-button">
                    Cancelar
                </button>
                <button type="submit" className="add-button">
                    Agregar
                </button>
            </div>
        </form>
    );
};

export default AddExpenseForm;