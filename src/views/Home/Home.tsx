import React, { useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link, useSearchParams } from "react-router-dom";

import { Alert, Box, Button } from "@mui/material";

// import AddButton from "../../components/AddButton/";
import Modal from "../../modals/Modal.js";
import CategoryGridStatistics from "../../components/Statistics/CategoryGridStatistics.tsx";
import ExpenseList from "../../components/ExpenseList/ExpenseList.tsx";
import ExpenseSearch from "../../components/ExpenseSearch/ExpenseSearch.tsx";
// import LoadingExpenses from "../../components/LoadingExpenses/index.js";
import PeriodFilters from "../../components/Filters/PeriodFilters.tsx";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

import colors from "../../common/colors.ts";
import { DATE_PARAM_FORMAT } from "../../common/constants.ts";
import { ExpensesContext } from "../../context/ExpensesContext.js";
import Settings from "../../components/Settings/Settings.tsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const { budget, categories, expensesFound, loading, syncData } =
    useContext(ExpensesContext);

  const [period, setPeriod] = useState<[string | null, string | null]>([
    startParam,
    endParam,
  ]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const expensesFiltered = expensesFound
    .filter((expense) => {
      return (
        period[0] !== null &&
        period[1] !== null &&
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

  // TODO: checar tantas recargas
  useEffect(
    useCallback(() => {
      const periodFilter = [period[0], period[1]];
      if (period[0] === null && period[1] === null) {
        const now = moment();
        periodFilter[0] = now.startOf("month").format(DATE_PARAM_FORMAT);
        periodFilter[1] = now.endOf("month").format(DATE_PARAM_FORMAT);
        setPeriod([periodFilter[0], periodFilter[1]]);
      }
      setSearchParams({
        start: periodFilter[0] as string,
        end: periodFilter[1] as string,
      });
    }, [period]),
    [period]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user authenticated", user);
      } else {
        console.log("no user authenticated");
      }
    });

    return unsubscribe();
  }, []);

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
      {noCatQuantity > 0 && (
        <Alert severity="warning">
          ATENCIÓN: {noCatQuantity} regs. sin categoría
        </Alert>
      )}
      <Box>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ float: "right" }}
        >
          Configuración
        </Button>
      </Box>
      {period[0] !== null && period[1] !== null && (
        <PeriodFilters period={period} setPeriod={setPeriod} />
      )}
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
      <ExpenseList
        title="Mis egresos"
        items={expensesFiltered}
        categories={categories}
      />
      {/* <AddButton /> */}
      <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Button variant="contained" fullWidth>
          <Link to="create" style={{ color: "white", textDecoration: "none" }}>
            Registrar
          </Link>
        </Button>
      </Box>

      {openModal && (
        <Modal>
          <Settings onSync={syncData} onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </Box>
  );
}

export default Home;
