import React, { useContext } from 'react';
import './ExpenseItem.css';

import { ExpensesContext } from '../context/ExpensesContext';

function ExpenseItem({id, desc, date, amount, type}) {
    const { deleteExpense } = useContext(ExpensesContext);

    return (
        <div className="ExpenseItem">
            <div>
                <h3 className="desc">
                    {desc} <span>${amount}</span> <span className="type">({type})</span>
                </h3>
                <span>Fecha: {date}</span>
            </div>
            <div>
                <span onClick={() => deleteExpense(id)}>Del</span>
            </div>
        </div>
    );
}

export default ExpenseItem;