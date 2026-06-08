import { Box, Typography } from "@mui/material";

import { numberWithCommas } from "../../common/utils.ts";

import "./ResumeExpenses.css";
import { getLevelColor, getLevelTextColor } from "../../common/constants.ts";

type ResumeExpensesType = {
  expenseQuantity: number;
  expensesCount: number;
  totalBudget: number;
};

// TODO: cambiar a formato de tarjetas con cada tarjeta una estadística (revisar TODO)
function ResumeExpenses({
  expenseQuantity,
  expensesCount,
  totalBudget,
}: ResumeExpensesType) {
  const percentage =
    totalBudget > 0
      ? expenseQuantity / totalBudget
      : expenseQuantity === 0
      ? 0
      : 1;
  const textColor = getLevelTextColor(percentage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" color="text.secondary">{expensesCount} movimientos</Typography>
      <Box sx={{ display: "flex", textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Total{" "}
          <span style={{ color: textColor }}>
            ${numberWithCommas(expenseQuantity)}
          </span>
          <Typography component="span" variant="h6" color="text.secondary">
            /${numberWithCommas(totalBudget)}
          </Typography>
        </Typography>
      </Box>
      <Typography>
        {expenseQuantity > totalBudget ? "Excedido" : "Disponible"} de $
        {numberWithCommas(Math.abs(totalBudget - expenseQuantity))}
      </Typography>
    </Box>
  );
}

export default ResumeExpenses;
