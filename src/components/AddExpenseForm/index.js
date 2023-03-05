import React, { useState, useContext } from 'react';
import moment from 'moment';

import icon from '../../assets/expenses.png';
import './AddExpenseForm.css';

import { ExpensesContext } from '../../context/ExpensesContext';
import { CSTtoUTC } from '../../utils';

function AddExpenseForm() {
    const { setOpenModal, insertExpense, formExpense } = useContext(ExpensesContext);
    const [expense, setExpense] = useState(formExpense);
    const [otherType, setOtherType] = useState(false);

    const onChange = e => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const onSelect = e => {
        const selected = e.target.value;

        if(selected === 'other') {
            setOtherType(true);
        } else {
            setOtherType(false);
            setExpense({
                ...expense, 
                category: selected
            });
        }
    };

    const onCancel = () => {
        setOpenModal(false);
    };

    const generateTempIndex = (description, date) => {
        return description.replace(' ', '_') + moment(date).format('YYYY-MM-DD');
    }

    const onSubmit = event => {
        event.preventDefault();
        let newExpense = expense;
        newExpense.date = CSTtoUTC(expense.date);
        newExpense.id = generateTempIndex(expense.description, newExpense.date);
        insertExpense(newExpense);
        setOpenModal(false);
    };
    return (
        <form onSubmit={onSubmit} className='AddExpenseForm'>
            <div className='form-header'>
                <img src={icon} alt='Ícono' className='icon' />
                <h3>Registra un nuevo gasto</h3>
            </div>
            <input
                onChange={onChange}
                value={expense.description}
                name='description'
                type='text'
                placeholder='Descripción'
                required />
            <select name='category' onChange={onSelect}>
                <option value=''>--Categoría--</option>
                <option value='food'>Comida</option>
                <option value='service'>Servicio</option>
                <option value='doctor'>Médico</option>
                <option value='transport'>Transporte</option>
                <option value='invest'>Inversión</option>
                <option value='expense'>Gasto</option>
                <option value='other'>Otro</option>
            </select>
            {otherType && <input 
                onChange={onChange}
                value={expense.category}
                name='category'
                type='text'
                placeholder='Categoría' 
                required/>}
            <input 
                onChange={onChange}
                value={expense.amount}
                name='amount'
                type='number'
                placeholder='Cantidad ($)'
                required />
            <input 
                onChange={onChange}
                value={expense.date}
                name='date'
                type='date' 
                placeholder='Fecha'
                required />
            <div className='buttons'>
                <button onClick={onCancel} type='button' className='cancel-button'>
                    Cancelar
                </button>
                <button type='submit' className='add-button'>
                    Agregar
                </button>
            </div>
        </form>
    );
};

export default AddExpenseForm;