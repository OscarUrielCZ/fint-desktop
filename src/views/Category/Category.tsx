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

  // TODO: gráfica de barras agnóstica al periodo seleccionado que muestre el gasto por mes

  // TODO: mostrar subcategorias. CONSIDEARA el mismo componente Grid, tener cuidado con recursividad, tal vez desabilitar links para las subcategorías

  //   TODO: agregar barra de búsqueda

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

  // this is because budget is monthly based
  const numberOfMonths = {
    [Period.MONTH]: 1,
    [Period.YEAR]: 12,
    [Period.FULL]: today.month() + 1 + (today.year() - 2024) * 12, // num of months in current year + num oof months since 2024
  };
  const categoryBudget =
    budget.items.find((item) => item.categoryId === id).amount *
    numberOfMonths[defaultPeriodType];

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
