import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ExpensesContext } from "../../context/ExpensesContext";
import Create from "../Create/index.tsx";
import moment from "moment";

function Update() {
  const { id } = useParams();
  const { expensesFound } = useContext(ExpensesContext);

  const updatingExpense = expensesFound.find((expense) => {
    if (expense.id === id) {
      return expense;
    }
    return null;
  });

  if (updatingExpense === undefined) {
    return (
      <div>
        Expense not found. <Link to="/fint-desktop">Regresar al inicio</Link>{" "}
      </div>
    );
  }

  updatingExpense.date = moment(updatingExpense.date).format("YYYY-MM-DD");

  return <Create updatingExpense={updatingExpense} />;
}

export default Update;
