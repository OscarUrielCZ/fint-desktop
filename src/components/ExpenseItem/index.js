import React, { useContext } from 'react';
import './ExpenseItem.css';

import { ExpensesContext } from '../../context/ExpensesContext';
import moment from 'moment';

function ExpenseItem({ expense }) {
    const { deleteExpense, openUpdateExpenseModal } = useContext(ExpensesContext);
    const {id, description, date, amount, category, subcategory} = expense;

    const getFormattedDate = date => {
        return moment(date).format("DD/MM/YYYY");
    }

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
                    <span>{getFormattedDate(date)}</span>
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