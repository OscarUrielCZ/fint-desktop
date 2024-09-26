import React, { useContext, useState } from "react";

import AddButton from "./components/AddButton/";
import AddExpenseForm from "./components/AddExpenseForm/";
import Chip from "./components/Chip/index.tsx";
import ExpenseSearch from "./components/ExpenseSearch/";
import ExpenseList from "./components/ExpenseList/";
import ExpenseItem from "./components/ExpenseItem/";
import LoadingExpenses from "./components/LoadingExpenses/";
import ResumeExpenses from "./components/ResumeExpenses/index.tsx";

import Modal from "./modals/Modal";

import { ExpensesContext } from "./context/ExpensesContext";

import { Period } from "./common/types.ts";

import "./App.css";

function AppUI() {
  const currentDate = new Date();

  const [dateComponents, setDateComponents] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  const [periodSelected, setPeriodSelected] = useState(Period.YEAR);

  const { error, expenses, expensesFound, loading, openModal, updateData } =
    useContext(ExpensesContext);

  const expensesFiltered = expensesFound
    .filter((expense) => {
      return (
        (periodSelected === Period.MONTH &&
          expense.date.getMonth() == dateComponents.month &&
          expense.date.getFullYear() == dateComponents.year) ||
        (periodSelected === Period.YEAR &&
          expense.date.getFullYear() == dateComponents.year)
      );
    })
    .sort((a, b) => b.date - a.date);

  return (
    <div className="App">
      <div className="top-pinned">
        <ExpenseSearch />
      </div>
      <div style={{ marginTop: "5.5rem", marginBottom: "2rem" }}>
        <ResumeExpenses expenses={expensesFiltered} />
      </div>
      <div>
        <Chip
          onClick={() => setPeriodSelected(Period.MONTH)}
          style={{
            backgroundColor:
              periodSelected === Period.MONTH ? "lightgreen" : "#ddd",
          }}
        >
          Mes
        </Chip>
        <Chip
          onClick={() => setPeriodSelected(Period.YEAR)}
          style={{
            backgroundColor:
              periodSelected === Period.YEAR ? "lightgreen" : "#ddd",
          }}
        >
          Año
        </Chip>
      </div>

      <div>
        {periodSelected === Period.MONTH && (
          <div>
            <span>Selecciona mes en cuestión</span>
            <select
              value={dateComponents.month}
              onChange={(e) =>
                setDateComponents({ ...dateComponents, month: e.target.value })
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
        <div>
          <span>Selecciona año en cuestión</span>
          <select
            value={dateComponents.year}
            onChange={(e) =>
              setDateComponents({ ...dateComponents, year: e.target.value })
            }
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "4rem" }}>
        <ExpenseList>
          {error && <p>Hubo un problema :</p>}

          {loading && <LoadingExpenses />}

          {!loading && !error && expensesFiltered.length === 0 && (
            <p>Sin datos. Agrega uno nuevo</p>
          )}

          {expensesFiltered.map((exp) => (
            <ExpenseItem key={exp.id} expense={exp} />
          ))}
        </ExpenseList>

        {openModal && (
          <Modal>
            <AddExpenseForm />
          </Modal>
        )}

        <AddButton />
      </div>
      <div className="bottom-pinned">
        <button className="btn-update" onClick={updateData}>
          Actualizar información
        </button>
      </div>
    </div>
  );
}

export default AppUI;
