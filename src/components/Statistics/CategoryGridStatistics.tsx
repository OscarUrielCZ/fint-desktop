import React from "react";
import { Category, Expense } from "../../common/types.ts";

import { numberWithCommas } from "../../common/utils.ts";
import { Box, Typography } from "@mui/material";
import { Budget } from "../../models/Budget.dto.ts";

const levelColors = [
  {
    threshold: 0.6,
    color: "#8CB369",
  },
  {
    threshold: 0.8,
    color: "#F4E285",
  },
  {
    threshold: 1,
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
    const { categoryId, amount } = expense;
    const categoryName = categoryId
      ? categories[categoryId]?.displayValue
      : "Sin categoría";

    acc[categoryName] = (acc[categoryName] || 0) + Number(amount);
    return acc;
  }, {});

  const budgetByCategory: object =
    budget?.items?.reduce((acc, item) => {
      const { categoryId, amount } = item;
      const categoryName =
        categories[categoryId]?.displayValue || "Sin categoría";
      acc[categoryName] = (acc[categoryName] || 0) + Number(amount);
      return acc;
    }, {}) || {};

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" align="center">
        Mis categorías
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          mt: 1,
        }}
      >
        {Object.entries(budgetByCategory).map(
          ([categoryName, budgetAmount]) => (
            <CategoryGridItem
              key={categoryName}
              categoryName={categoryName}
              amount={expenseByCategory[categoryName] || 0}
              percentage={
                ((expenseByCategory[categoryName] || 0) * 100) / totalAmount
              }
              reference={budgetAmount}
            />
          )
        )}
      </Box>
    </Box>
  );
}

function CategoryGridItem({ categoryName, amount, percentage, reference }) {
  const color =
    reference !== 0
      ? levelColors.find((color) => amount / reference <= color.threshold)
          ?.color
      : amount === 0
      ? levelColors[0].color
      : levelColors[levelColors.length - 1].color;
  return (
    <Box sx={{ p: 1, borderRadius: 1, backgroundColor: color }}>
      <Typography variant="body1">{categoryName}</Typography>
      <Typography variant="subtitle2">
        ${numberWithCommas(amount)} /${numberWithCommas(reference)}
      </Typography>{" "}
      <Typography variant="caption">({percentage.toFixed(1)}%)</Typography>
    </Box>
  );
}

export default CategoryGridStatistics;
