import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Alert, Box, Button, Typography } from "@mui/material";

// import AddButton from "../../components/AddButton/";
// import AddExpenseForm from "../../components/AddExpenseForm/index.js";
// import Modal from "../../modals/Modal.js";
import CategoryGridStatistics from "../../components/Statistics/CategoryGridStatistics.tsx";
import ExpenseItem from "../../components/ExpenseItem/ExpenseItem.tsx";
import ExpenseList from "../../components/ExpenseList/index.js";
import ExpenseSearch from "../../components/ExpenseSearch/index.js";
import LoadingExpenses from "../../components/LoadingExpenses/index.js";
import PeriodFilters from "../../components/Filters/PeriodFilters.tsx";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

import colors from "../../common/colors.ts";
import { ExpensesContext } from "../../context/ExpensesContext.js";
import { Period } from "../../common/types.ts";

function Home() {
  const currentDate = new Date();

  const [dateComponents, setDateComponents] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  const [periodSelected, setPeriodSelected] = useState(Period.MONTH);

  const { budget, categories, expensesFound, loading, openModal, syncData } =
    useContext(ExpensesContext);

  const expensesFiltered = expensesFound
    .filter((expense) => {
      return (
        periodSelected === Period.FULL ||
        (periodSelected === Period.MONTH &&
          expense.date.getMonth() === dateComponents.month &&
          expense.date.getFullYear() === dateComponents.year) ||
        (periodSelected === Period.YEAR &&
          expense.date.getFullYear() === dateComponents.year)
      );
    })
    .sort((a, b) => b.date - a.date);

  const totalBudget =
    budget?.items?.reduce((acc, item) => {
      return acc + Number(item.amount);
    }, 0) || 0;
  let expenseQuantity: number = 0;
  let investmentQuantity: number = 0;
  let expensesCount: number = expensesFiltered.length;
  let noCatQuantity: number = 0;

  expensesFiltered.forEach((expense) => {
    if (!expense.categoryId) {
      noCatQuantity += 1;
    } else {
      if (expense.categoryId === "DxsSPujNFFhSJt1C0Qe2")
        // inversión
        investmentQuantity += Number(expense.amount);
      else expenseQuantity += Number(expense.amount);
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: colors.background,
      }}
    >
      {noCatQuantity > 0 && (
        <Alert severity="warning">
          ATENCIÓN: {noCatQuantity} regs. sin categoría
        </Alert>
      )}
      <Box>
        <Button
          variant="contained"
          onClick={syncData}
          sx={{ float: "right", mr: 2 }}
        >
          Sincronizar datos
        </Button>
      </Box>
      <PeriodFilters
        setPeriodSelected={setPeriodSelected}
        periodSelected={periodSelected}
        dateComponents={dateComponents}
        setDateComponents={setDateComponents}
      />
      <ExpenseSearch />
      <ResumeExpenses
        totalBudget={totalBudget}
        expenseQuantity={expenseQuantity}
        investmentQuantity={investmentQuantity}
        expensesCount={expensesCount}
      />
      <CategoryGridStatistics
        categories={categories}
        expenses={expensesFiltered}
        totalAmount={expenseQuantity + investmentQuantity}
        budget={budget}
      />
      <ExpenseList>
        <Typography align="center" variant="h6">
          Mis egresos
        </Typography>

        {loading && <LoadingExpenses />}

        {!loading && expensesCount === 0 && (
          <Typography variant="body1" align="center">
            Sin datos. Agrega uno nuevo
          </Typography>
        )}

        {expensesFiltered.map((exp) => (
          <ExpenseItem
            key={exp.id}
            category={categories[exp.categoryId]}
            expense={exp}
          />
        ))}
      </ExpenseList>

      {/* {openModal && (
        <Modal>
          <AddExpenseForm />
        </Modal>
      )}
      <AddButton /> */}
      <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Button variant="contained" fullWidth>
          <Link to="create" style={{ color: "white", textDecoration: "none" }}>
            Registrar
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
