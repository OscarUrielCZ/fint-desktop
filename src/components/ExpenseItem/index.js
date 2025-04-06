import React, { useContext } from "react";
import "./ExpenseItem.css";

import { ExpensesContext } from "../../context/ExpensesContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ExpenseItem({ category, expense }) {
  const navigate = useNavigate();
  const { deleteExpense, openUpdateExpenseModal } = useContext(ExpensesContext);
  const {
    id,
    description,
    date,
    amount,
    category: oldCategory,
    subcategoryId,
  } = expense;

  const editExpense = (id) => {
    navigate(`/fint-desktop/update/${id}`);
  };

  const getFormattedDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const categoryName = category?.displayValue || "Sin categoría";
  const subcategoryName =
    category?.subcategories[subcategoryId]?.displayValue || "Sin subcategoría";

  return (
    <div style={{ borderRadius: "1rem" }}>
      <div className="ExpenseItem">
        <div>
          <span className="name">{description}</span>
          <span className="category"> ({oldCategory})</span>
          <span className="category">
            {categoryName} {subcategoryName}
          </span>
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
        <span className="update" onClick={() => editExpense(expense.id)}>
          Modificar
        </span>
      </div>
    </div>
  );
}

export default ExpenseItem;
