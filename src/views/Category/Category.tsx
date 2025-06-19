import { useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import ExpenseList from "../../components/ExpenseList/ExpenseList.tsx";
import { ExpensesContext } from "../../context/ExpensesContext";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

function Category() {
  const { id } = useParams();
  const { budget, categories, expensesFound } = useContext(ExpensesContext);

  // TODO: mostar budget basado en el periodo de tiempo

  // TODO: gráfica de barras agnóstica al periodo seleccionado que muestre el gasto por mes

  // TODO: mostrar subcategorias

  const categoryExpenses = expensesFound.filter(
    (expense) => expense.categoryId === id
  );
  const totalAmount = categoryExpenses.reduce(
    (acc, expense) => acc + Number(expense.amount),
    0
  );
  const categoryBudget = budget.items.find(
    (item) => item.categoryId === id
  ).amount;

  const categoryName = categories[id as string].displayValue;

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h3" textAlign="center">
        {categoryName}
      </Typography>

      <ResumeExpenses
        totalBudget={categoryBudget}
        expenseQuantity={totalAmount}
        expensesCount={categoryExpenses.length}
      />

      <ExpenseList
        title="Registros"
        items={categoryExpenses}
        categories={categories}
      />
    </Box>
  );
}

export default Category;
