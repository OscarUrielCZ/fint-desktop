import React, { useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link, useSearchParams } from "react-router-dom";

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
import { DATE_PARAM_FORMAT } from "../../common/constants.ts";
import { ExpensesContext } from "../../context/ExpensesContext.js";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  // redirext to path with search params
  if (!start || !end) {
    setSearchParams({
      start: moment().startOf("month").format(DATE_PARAM_FORMAT),
      end: moment().endOf("month").format(DATE_PARAM_FORMAT),
    });
  }

  const { budget, categories, expensesFound, loading, syncData } =
    useContext(ExpensesContext);

  const [period, setPeriod] = useState<[string, string]>([
    start as string,
    end as string,
  ]);

  const expensesFiltered = expensesFound
    .filter((expense) => {
      return (
        expense.date.getTime() >= new Date(period[0]).getTime() &&
        expense.date.getTime() <= new Date(period[1]).getTime()
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

  useEffect(
    useCallback(() => {
      console.log("period changed", period);
      setSearchParams({
        start: moment(period[0]).startOf("month").format(DATE_PARAM_FORMAT),
        end: moment(period[1]).endOf("month").format(DATE_PARAM_FORMAT),
      });
    }, [period]),
    [period]
  );

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
      <PeriodFilters period={period} setPeriod={setPeriod} />
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
