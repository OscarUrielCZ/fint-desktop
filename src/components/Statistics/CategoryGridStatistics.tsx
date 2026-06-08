import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { Budget } from "../../models/Budget.dto.ts";
import { Category } from "../../models/Category.dto.ts";
import { Expense } from "../../models/Expense.dto.ts";
import { getLevelColor } from "../../common/constants.ts";
import { numberWithCommas } from "../../common/utils.ts";

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
    acc[categoryId] = (acc[categoryId] || 0) + Number(amount);
    return acc;
  }, {});

  const budgetByCategory: object =
    budget?.items?.reduce((acc, item) => {
      const { categoryId, amount } = item;
      acc[categoryId] = (acc[categoryId] || 0) + Number(amount);
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
        {Object.entries(budgetByCategory).map(([categoryId, budgetAmount]) => (
          <CategoryGridItem
            key={categoryId}
            categoryId={categoryId}
            categoryName={
              categories[categoryId].displayValue || "Sin categoría"
            }
            amount={expenseByCategory[categoryId] || 0}
            percentage={
              ((expenseByCategory[categoryId] || 0) * 100) / totalAmount
            }
            reference={budgetAmount}
          />
        ))}
      </Box>
    </Box>
  );
}

function CategoryGridItem({
  categoryId,
  categoryName,
  amount,
  percentage,
  reference,
}) {
  const budgetPercentage =
    reference !== 0 ? amount / reference : amount === 0 ? 0 : 1;
  const color = getLevelColor(budgetPercentage);
  return (
    <Link
      to={`/fint-desktop/category/${categoryId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          backgroundColor: color,
          cursor: "pointer",
          color: "text.primary", // Dark text on light background
          border: "1px solid rgba(0,0,0,0.04)",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }
        }}
      >
        <Typography variant="body1">{categoryName}</Typography>
        <Typography variant="subtitle2">
          ${numberWithCommas(amount)} /${numberWithCommas(reference)}
        </Typography>{" "}
        <Typography variant="caption">({percentage.toFixed(1)}%)</Typography>
      </Box>
    </Link>
  );
}

export default CategoryGridStatistics;
