import React, { useContext } from "react";
import "./ExpenseItem.css";

import { ExpensesContext } from "../../context/ExpensesContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import * as Colors from "../../common/colors.ts";

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

  return (
    <div style={{ borderRadius: "1rem" }}>
      <div className="ExpenseItem">
        <div>
          <span className="name">{description}</span>
          <CategoryPanel
            category={category}
            subcategoryId={subcategoryId}
            oldCategory={oldCategory}
          />
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

const CategoryPanel = ({ category, subcategoryId, oldCategory }) => {
  const categoryName = category?.displayValue || "?";
  const subcategoryName =
    category?.subcategories[subcategoryId]?.displayValue || "";

  return (
    <Box>
      {!Boolean(category) ? (
        <Typography color="red">Missing {oldCategory}</Typography>
      ) : (
        <Typography>
          {categoryName} - {subcategoryName}
        </Typography>
      )}
    </Box>
  );
};

export default ExpenseItem;
