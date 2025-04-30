import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ExpensesContext } from "../../context/ExpensesContext.js";
import Create from "../Create/Create.tsx";
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

  const tempExpense = {
    ...updatingExpense,
    date: moment(updatingExpense.date).format("YYYY-MM-DD"),
  };
  // updatingExpense.date = moment(updatingExpense.date).format("YYYY-MM-DD");

  return <Create updatingExpense={tempExpense} />;
}

export default Update;
