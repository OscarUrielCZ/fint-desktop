import React, { useContext } from "react";

import { TextField } from "@mui/material";

import { ExpensesContext } from "../../context/ExpensesContext";

function ExpenseSearch() {
  const { searchValue: state, setSearchValue: setState } =
    useContext(ExpensesContext);

  return (
    <TextField
      placeholder="Buscar..."
      value={state}
      onChange={(event) => setState(event.target.value)}
    />
  );
}

export default ExpenseSearch;
