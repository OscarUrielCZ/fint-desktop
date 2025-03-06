import React from "react";

import { numberWithCommas } from "../../common/utils.ts";

import "./ResumeExpenses.css";

type ResumeExpensesType = {
  expenseQuantity: number;
  investmentQuantity: number;
  expensesCount: number;
};

function ResumeExpenses({
  expenseQuantity,
  investmentQuantity,
  expensesCount,
}: ResumeExpensesType) {
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
