import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { Box, Typography } from "@mui/material";

import { DATE_PARAM_FORMAT } from "../../common/constants.ts";
import ExpenseList from "../../components/ExpenseList/ExpenseList.tsx";
import { ExpensesContext } from "../../context/ExpensesContext";
import PeriodFilters from "../../components/Filters/PeriodFilters.tsx";
import { Period } from "../../common/types.ts";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

function Category() {
  const { id } = useParams();
  const { budget, categories, expensesFound } = useContext(ExpensesContext);

  const today = moment();
  const [defaultPeriodType, setDefaultPeriodType] = useState<Period>(
    Period.MONTH
  );
  const [period, setPeriod] = useState<[string, string]>([
    today.startOf(defaultPeriodType as any).format(DATE_PARAM_FORMAT),
    today.endOf(defaultPeriodType as any).format(DATE_PARAM_FORMAT),
  ]);

  // TODO: mostar budget basado en el periodo de tiempo

  // TODO: gráfica de barras agnóstica al periodo seleccionado que muestre el gasto por mes

  // TODO: mostrar subcategorias

  const categoryExpenses = expensesFound.filter(
    (expense) =>
      expense.categoryId === id &&
      expense.date.getTime() >= new Date(period[0]).getTime() &&
      expense.date.getTime() <= new Date(period[1]).getTime()
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
        p: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
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

      <PeriodFilters
        period={period}
        setPeriod={setPeriod}
        periodType={defaultPeriodType}
        setPeriodType={setDefaultPeriodType}
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
