import React, { useContext, useState } from "react";

// import AddButton from "../../components/AddButton/";
import AddExpenseForm from "../../components/AddExpenseForm/index.js";
import Chip from "../../components/Chip/index.tsx";
import ExpenseSearch from "../../components/ExpenseSearch/index.js";
import ExpenseList from "../../components/ExpenseList/index.js";
import ExpenseItem from "../../components/ExpenseItem/ExpenseItem.tsx";
import LoadingExpenses from "../../components/LoadingExpenses/index.js";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

import Modal from "../../modals/Modal.js";

import { ExpensesContext } from "../../context/ExpensesContext.js";

import { Period } from "../../common/types.ts";

import "./Home.css";
import CategoryGridStatistics from "../../components/Statistics/CategoryGridStatistics.tsx";
import { Link } from "react-router-dom";
import { Alert, Box, Button } from "@mui/material";

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

  const totalBudget = budget.items.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);
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
    <div>
      {noCatQuantity > 0 && (
        <Alert severity="warning">
          ATENCIÓN: {noCatQuantity} regs. sin categoría
        </Alert>
      )}
      <div>
        <button className="btn-update" onClick={syncData}>
          Actualizar información
        </button>
      </div>
      <div>
        <ExpenseSearch />
      </div>
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <ResumeExpenses
          totalBudget={totalBudget}
          expenseQuantity={expenseQuantity}
          investmentQuantity={investmentQuantity}
          expensesCount={expensesCount}
        />
      </div>
      <div>
        <Chip
          onClick={() => setPeriodSelected(Period.MONTH)}
          style={{
            backgroundColor:
              periodSelected === Period.MONTH ? "#9EA1D4" : "#ddd",
          }}
        >
          Mes
        </Chip>
        <Chip
          onClick={() => setPeriodSelected(Period.YEAR)}
          style={{
            backgroundColor:
              periodSelected === Period.YEAR ? "#9EA1D4" : "#ddd",
          }}
        >
          Año
        </Chip>
        <Chip
          onClick={() => setPeriodSelected(Period.FULL)}
          style={{
            backgroundColor:
              periodSelected === Period.FULL ? "#9EA1D4" : "#ddd",
          }}
        >
          Todo
        </Chip>
      </div>

      <div>
        {periodSelected === Period.MONTH && (
          <div>
            <span>Selecciona un mes </span>
            <select
              value={dateComponents.month}
              onChange={(e) =>
                setDateComponents({
                  ...dateComponents,
                  month: Number(e.target.value),
                })
              }
            >
              <option value="0">Enero</option>
              <option value="1">Febrero</option>
              <option value="2">Marzo</option>
              <option value="3">Abril</option>
              <option value="4">Mayo</option>
              <option value="5">Junio</option>
              <option value="6">Julio</option>
              <option value="7">Agosto</option>
              <option value="8">Septiembre</option>
              <option value="9">Octubre</option>
              <option value="10">Noviembre</option>
              <option value="11">Diciembre</option>
            </select>
          </div>
        )}
        {periodSelected !== Period.FULL && (
          <div>
            <span>Selecciona un año </span>
            <select
              value={dateComponents.year}
              onChange={(e) =>
                setDateComponents({
                  ...dateComponents,
                  year: Number(e.target.value),
                })
              }
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        )}
      </div>

      <CategoryGridStatistics
        categories={categories}
        expenses={expensesFiltered}
        totalAmount={expenseQuantity + investmentQuantity}
        budget={budget}
      />

      <div style={{ marginBottom: "4rem" }}>
        <ExpenseList>
          <div style={{ fontWeight: "bold", textAlign: "center" }}>
            Listado de egresos
          </div>

          {loading && <LoadingExpenses />}

          {!loading && expensesCount === 0 && (
            <p>Sin datos. Agrega uno nuevo</p>
          )}

          {expensesFiltered.map((exp) => (
            <ExpenseItem
              key={exp.id}
              category={categories[exp.categoryId]}
              expense={exp}
            />
          ))}
        </ExpenseList>

        {openModal && (
          <Modal>
            <AddExpenseForm />
          </Modal>
        )}

        {/* <AddButton /> */}
      </div>
      <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Button variant="contained" fullWidth>
          <Link to="create" style={{ color: "white", textDecoration: "none" }}>
            Registrar
          </Link>
        </Button>
      </Box>
    </div>
  );
}

export default Home;
