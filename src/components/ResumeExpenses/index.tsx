import React, { useEffect } from "react";

import { numberWithCommas } from "../../common/utils.ts";

import "./ResumeExpenses.css";

function ResumeExpenses({ expenses }) {
  let totalAmount: number = expenses.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.amount),
    0
  );
  let expensesCount: number = expenses.length;

  // useEffect(() => {
  //     totalAmount = 0;

  //     for(let i=0; i<expensesCount; i++) {
  //         totalAmount += expenses[i].amount;
  //     }

  //     console.log('render', totalAmount);

  // }, [expenses]);

  return (
    <div>
      <p className="stat-sentence">
        Monto total: ${numberWithCommas(totalAmount)}
      </p>
      <p className="stat-sentence">Total de movimientos: {expensesCount}</p>

      <h3>Gastos por categoría</h3>
    </div>
  );
}

export default ResumeExpenses;
