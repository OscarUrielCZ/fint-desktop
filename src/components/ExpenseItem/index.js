import React, { useContext } from 'react';
import './ExpenseItem.css';

import { ExpensesContext } from '../../context/ExpensesContext';
import { castFirebaseDate } from '../../utils.ts';

function ExpenseItem({ expense }) {
    const { deleteExpense, openUpdateExpenseModal } = useContext(ExpensesContext);
    const {id, description, date, amount, category, subcategory} = expense;

    return (
        <div style={{ borderRadius: '1rem' }}>
            <div className='ExpenseItem'>
                <div>
                    <span className='name'>{description}</span>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                    <span className='category'>{category}</span>
                    {
                        !!subcategory && <span className='category'> - {subcategory}</span>
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>${amount}</span>
                    <span>{castFirebaseDate(date)}</span>
                </div>
            </div>
            <div className='actions'>
                <span 
                    className='delete'
                    onClick={() => deleteExpense(id)}>
                    Eliminar
                </span>
                <span 
                    className='update'
                    onClick={() => openUpdateExpenseModal(expense)}>
                    Actualizar
                </span>
            </div>
        </div>
    );
}

export default ExpenseItem;