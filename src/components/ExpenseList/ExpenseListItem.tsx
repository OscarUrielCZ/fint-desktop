import React, { useContext } from "react";

import moment from "moment";
import { Box, Chip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ExpensesContext } from "../../context/ExpensesContext";
import { useNavigate } from "react-router-dom";
import { Expense } from "../../models/Expense.dto";
import { Category } from "../../models/Category.dto";

import "./ExpenseItem.css";

function ExpenseListItem({
  data,
  category,
}: {
  data: Expense;
  category: Category;
}) {
  const navigate = useNavigate();
  const { deleteExpense } = useContext(ExpensesContext);
  const { id, description, date, amount, subcategoryId } = data;

  const editExpense = (id) => {
    navigate(`/fint-desktop/update/${id}`);
  };

  const getFormattedDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const subcategoryName =
    category.subcategories && subcategoryId
      ? category.subcategories[subcategoryId]?.displayValue
      : null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
        p: 1,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" color="grey">
          {getFormattedDate(date)}
        </Typography>
        <Typography variant="h6">${amount}</Typography>
      </Box>
      <Box sx={{ textAlign: "left", px: 2 }}>
        <Typography>{description}</Typography>
        <Chip label={category.displayValue} />
        {subcategoryName && <Chip label={subcategoryName} sx={{ ml: 1 }} />}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <DeleteIcon
          color="error"
          sx={{ cursor: "pointer", fontSize: "1.8rem" }}
          onClick={() => deleteExpense(id)}
        />
        <EditIcon
          color="warning"
          sx={{ cursor: "pointer", fontSize: "1.8rem", ml: 3 }}
          onClick={() => editExpense(data.id)}
        />
      </Box>
    </Box>
  );
}

export default ExpenseListItem;
