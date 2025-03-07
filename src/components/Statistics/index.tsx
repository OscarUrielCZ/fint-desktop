import React from "react";
import { Expense } from "../../common/types";

import { numberWithCommas } from "../../common/utils.ts";

import "./Statistics.css";

function Statistics({
  expenses,
  totalAmount,
}: {
  expenses: Expense[];
  totalAmount: number;
}) {
  const expenseByCategory: object = expenses.reduce((acc, expense) => {
    const { category } = expense;

    acc[category] = (acc[category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // order expenseByCategory descending
  const orderedExpenseByCategory = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="container">
      <span className="title">Categorías con mayores egresos</span>
      <table>
        <tbody>
          {orderedExpenseByCategory.map(([category, amount]) => (
            <tr key={category}>
              <td>{category}</td>
              <td style={{ textAlign: "right" }}>
                {((amount * 100) / totalAmount).toFixed(1)}%
              </td>
              <td>${numberWithCommas(amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
