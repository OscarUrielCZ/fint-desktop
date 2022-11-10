import React, { useContext } from 'react';
import './ExpenseItem.css';

import { ExpensesContext } from '../../context/ExpensesContext';
import { castFirebaseDate } from "../../utils";

function ExpenseItem({ expense }) {
    const { deleteExpense, openUpdateExpenseModal } = useContext(ExpensesContext);
    const {id, desc, date, amount, type} = expense;

    return (
        <div className="ExpenseItem">
            <div>
                <h3 className="desc">
                    {desc} <span>${amount}</span> <span className="type">({type})</span>
                </h3>
                <span>Fecha: {castFirebaseDate(date)}</span>
            </div>
            <div>
                <span onClick={() => deleteExpense(id)}>Del</span>
                <span onClick={() => openUpdateExpenseModal(expense)}>Upd</span>
            </div>
        </div>
    );
}

export default ExpenseItem;