import React from "react";
import { Category, Expense } from "../../common/types.ts";

import { numberWithCommas } from "../../common/utils.ts";
import { Box, Typography } from "@mui/material";
import { Budget } from "../../models/Budget.dto.ts";

const levelColors = [
  {
    threshold: 0.4,
    color: "#8CB369",
  },
  {
    threshold: 0.6,
    color: "#F4E285",
  },
  {
    threshold: 0.8,
    color: "#F4A259",
  },
  {
    threshold: Infinity,
    color: "#C94F55",
  },
];

type CategoryGridStatisticsType = {
  categories: { [key: string]: Category };
  expenses: Expense[];
  totalAmount: number;
  budget: Budget;
};

function CategoryGridStatistics({
  categories,
  expenses,
  totalAmount,
  budget,
}: CategoryGridStatisticsType) {
  const expenseByCategory: object = expenses.reduce((acc, expense) => {
    const { categoryId } = expense;
    const categoryName = categoryId
      ? categories[categoryId]?.displayValue
      : "Sin categoría";
    acc[categoryName] = (acc[categoryName] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // order expenseByCategory descending
  const orderedExpenseByCategory = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6">Categorías con mayores egresos</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          m: 1,
        }}
      >
        {orderedExpenseByCategory.map(([category, amount]) => (
          <CategoryGridItem
            key={category}
            category={category}
            amount={amount}
            percentage={(amount * 100) / totalAmount}
            reference={2000}
          />
        ))}
      </Box>
    </Box>
  );
}

function CategoryGridItem({ category, amount, percentage, reference }) {
  const color = levelColors.find(
    (color) => amount / reference <= color.threshold
  )?.color;
  return (
    <Box sx={{ p: 1, borderRadius: 1, backgroundColor: color }}>
      <Typography variant="body1">
        {category} ({percentage.toFixed(1)}%)
      </Typography>
      <Typography variant="subtitle2">${numberWithCommas(amount)}</Typography>
    </Box>
  );
}

export default CategoryGridStatistics;
