import React from "react";

import { numberWithCommas } from "../../common/utils.ts";

import "./ResumeExpenses.css";
import { Typography } from "@mui/material";

type ResumeExpensesType = {
  expenseQuantity: number;
  investmentQuantity: number;
  expensesCount: number;
  totalBudget: number;
};

function ResumeExpenses({
  expenseQuantity,
  investmentQuantity,
  expensesCount,
  totalBudget,
}: ResumeExpensesType) {
  return (
    <div className="container">
      <span className="secondary-stat-sentence">
        {expensesCount} movimientos
      </span>
      <span className="stat-sentence">
        Egresos totales: ${numberWithCommas(expenseQuantity)}
      </span>
      <span className="stat-sentence">
        Inversión de ${numberWithCommas(investmentQuantity)}
      </span>
      <Typography variant="caption">
        /${numberWithCommas(totalBudget)}
      </Typography>
    </div>
  );
}

export default ResumeExpenses;
