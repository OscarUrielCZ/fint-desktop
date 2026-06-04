import React, { useContext, useState, useMemo } from "react";
import moment from "moment";

import { Box } from "@mui/material";

// import AddButton from "../../components/AddButton/";
import CategoryGridStatistics from "../../components/Statistics/CategoryGridStatistics.tsx";
import ExpenseList from "../../components/ExpenseList/ExpenseList.tsx";
import ExpenseSearch from "../../components/ExpenseSearch/ExpenseSearch.tsx";
// import LoadingExpenses from "../../components/LoadingExpenses/index.js";
import PeriodFilters from "../../components/Filters/PeriodFilters.tsx";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

import colors from "../../common/colors.ts";
import { ExpensesContext } from "../../context/ExpensesContext.js";
import { Period } from "../../common/types.ts";
import { Expense } from "../../models/Expense.dto.ts";

// TODO: eliminar parametros del URL, se compartirán mediante el context
// TODO: hacer un budget mensual, este se va a generar uno nuevo cada mes con los valores del mes anterior y el usuario tendrá que confirmarlo, este budget se usará para hacer gráficas de barras y de puntos (combinada, puntos el budget esperado y barras el gasto real)
function HomeView() {
  const { budget, categories, expensesFound, loading } =
    useContext(ExpensesContext);

  const today = moment();
  const [defaultPeriodType, setDefaultPeriodType] = useState<Period>(
    Period.MONTH
  );
  const [period, setPeriod] = useState<[Date, Date]>([
    today.startOf(defaultPeriodType as any).toDate(),
    today.endOf(defaultPeriodType as any).toDate(),
  ]);

  const expensesFiltered = useMemo(() => {
    return expensesFound.filter((expense: Expense) => {
      return (
        period[0] !== null &&
        period[1] !== null &&
        expense.date.getTime() >= period[0].getTime() &&
        expense.date.getTime() <= period[1].getTime()
      );
    });
  }, [expensesFound, period]);

  const totalBudget = useMemo(() => {
    return (
      budget?.items?.reduce((acc, item) => {
        return acc + Number(item.amount);
      }, 0) || 0
    );
  }, [budget]);

  const { expenseQuantity, expensesCount } = useMemo(() => {
    let quantity = 0;
    expensesFiltered.forEach((expense) => {
      quantity += Number(expense.amount);
    });
    return {
      expenseQuantity: quantity,
      expensesCount: expensesFiltered.length,
    };
  }, [expensesFiltered]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: colors.background,
        padding: 1,
        marginBottom: 6,
      }}
    >
      {period[0] !== null && period[1] !== null && (
        <PeriodFilters
          period={period}
          setPeriod={setPeriod}
          periodType={defaultPeriodType}
          setPeriodType={setDefaultPeriodType}
        />
      )}
      {/* TODO: quitar barra de busqueda y eliminar su valor del context */}
      <ExpenseSearch />
      <ResumeExpenses
        totalBudget={totalBudget}
        expenseQuantity={expenseQuantity}
        expensesCount={expensesCount}
      />
      <CategoryGridStatistics
        categories={categories}
        expenses={expensesFiltered}
        totalAmount={expenseQuantity}
        budget={budget}
      />
      {/* TODO: quitar registros del home y dejar solo los 3 últimos */}
      <ExpenseList
        title="Últimos gastos"
        items={expensesFiltered}
        categories={categories}
      />
      {/* <AddButton /> */}
    </Box>
  );
}

export default HomeView;
