import React from "react";

import { numberWithCommas } from "../../common/utils.ts";

import "./ResumeExpenses.css";

function ResumeExpenses({ expenses }) {
  let expenseQuantity: number = 0;
  let investmentQuantity: number = 0;
  let expensesCount: number = expenses.length;

  expenses.forEach((expense) => {
    if (expense.category === "Inversión")
      investmentQuantity += Number(expense.amount);
    else expenseQuantity += Number(expense.amount);
  });

  return (
    <div className="container">
      <span className="stat-sentence">
        Egresos totales: ${numberWithCommas(expenseQuantity)}
      </span>
      <span className="stat-sentence">
        Inversión de ${numberWithCommas(investmentQuantity)}
      </span>
      <span className="secondary-stat-sentence">
        {expensesCount} movimientos
      </span>
    </div>
  );
}

export default ResumeExpenses;
