import React from 'react';
import { Expense } from '../../common/types';

import { numberWithCommas } from '../../common/utils.ts';

import './Statistics.css';

function Statistics({ expenses }: { expenses: Expense[] }) {
    const expenseByCategory: object = expenses.reduce((acc, expense) => {
        const { category } = expense;
        
        acc[category] = (acc[category] || 0) + Number(expense.amount);
        return acc;
    }, {});

    // order expenseByCategory descending
    const orderedExpenseByCategory = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1]);

    console.log(orderedExpenseByCategory);

    return (
        <div className="container">
            <span className="title">Categorías con mayores egresos</span>
            <table>
                {orderedExpenseByCategory.map(([category, amount]) => (
                    <tr>
                        <td>
                        {category}
                        </td>
                        <td>
                            ${numberWithCommas(amount)}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Statistics;