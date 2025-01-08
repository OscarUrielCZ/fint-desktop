import React, { useContext } from "react";
import "./ExpenseItem.css";

import { ExpensesContext } from "../../context/ExpensesContext";
import moment from "moment";

function ExpenseItem({ expense }) {
  const { deleteExpense, openUpdateExpenseModal } = useContext(ExpensesContext);
  const { id, description, date, amount, category } = expense;

  const getFormattedDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div style={{ borderRadius: "1rem" }}>
      <div className="ExpenseItem">
        <div>
          <span className="name">{description}</span>
          <span className="category"> ({category})</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <span className="category">{getFormattedDate(date)}</span>
          <span>${amount}</span>
        </div>
      </div>
      <div className="actions">
        <span className="delete" onClick={() => deleteExpense(id)}>
          Eliminar
        </span>
        <span
          className="update"
          onClick={() => openUpdateExpenseModal(expense)}
        >
          Modificar
        </span>
      </div>
    </div>
  );
}

export default ExpenseItem;
