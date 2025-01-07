import React from "react";

import { numberWithCommas } from "../../common/utils.ts";

import "./ResumeExpenses.css";

function ResumeExpenses({ expenses }) {
  let totalAmount: number = expenses.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.amount),
    0
  );
  let expensesCount: number = expenses.length;

  return (
    <div className="container">
      <span className="stat-sentence">
        Egresos totales: ${numberWithCommas(totalAmount)}
      </span>
      <span className="secondary-stat-sentence">
        {expensesCount} movimientos
      </span>
    </div>
  );
}

export default ResumeExpenses;
