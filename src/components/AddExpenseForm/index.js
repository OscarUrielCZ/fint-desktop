import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import icon from '../../assets/expenses.png';
import './AddExpenseForm.css';

import { ExpensesContext } from '../../context/ExpensesContext';
import { toDateObject } from '../../utils.ts';

function AddExpenseForm() {
    const {
        categories,
        formExpense,
        insertExpense, 
        setOpenModal, 
        updateExpense, 
    } = useContext(ExpensesContext);
    
    const [expense, setExpense] = useState(formExpense);
    const [subcategories, setSubcategories] = useState([]);

    const onChange = e => {
        if (e.target.name === 'category') {
            setExpense({
                ...expense,
                subcategory: '',
                [e.target.name]: e.target.value
            });
        } else {   
            setExpense({
                ...expense,
                [e.target.name]: e.target.value
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

        if (expense.id !== undefined) { // ya existe, i.e. es actualización
            let updatedExpense = expense;
            updatedExpense.date = toDateObject(expense.date);
            updateExpense(updatedExpense);
        } else { // es nuevo
            let newExpense = expense;
            console.log('registering', expense.date, typeof expense.date);
            newExpense.date = toDateObject(expense.date);
            newExpense.id = generateTempIndex(expense.description, newExpense.date);
            console.log('registering2', newExpense);
            insertExpense(newExpense);
        }
        setOpenModal(false);
    };

    useEffect(() => {
        categories.forEach(cat => {
            if (cat.value === expense.category)
                setSubcategories(cat.subcategories);
        });

    }, [expense.category, categories]);

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
            <select name='category' value={expense.category} onChange={onChange} required>
                <option value=''>--Categoría--</option>
                {
                    categories.map(cat => (
                        <option key={cat.id} value={cat.value}>{cat.displayValue}</option>
                    ))
                }
            </select>
            {
                subcategories.length > 0 && (
                    <select name='subcategory' value={expense.subcategory} onChange={onChange}>
                        <option value=''>--Subcategoría--</option>
                        {
                            subcategories.map(subcat => (
                                <option key={subcat.value} value={subcat.value}>{subcat.displayValue}</option>
                            ))
                        }
                    </select>
                )
            }
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