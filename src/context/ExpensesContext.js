import React, { useState, createContext } from "react";

import moment from "moment";

import useStorage from "../hooks/useStorage.ts";
import { StorageStatus } from "../common/types.ts";

const STORAGE_ID = "fint_V2";

const defaultExpense = {
  categoryId: "",
  subcategoryId: "",
  description: "",
  amount: "",
  date: moment(new Date()).format("YYYY-MM-DD"),
};

const ExpensesContext = createContext();
function ExpensesProvider(props) {
  const [formExpense, setFormExpense] = useState(defaultExpense);
  const [searchValue, setSearchValue] = useState("");

  const {
    budget,
    categories,
    expenses,
    loading,
    deleteExpense,
    insertExpense,
    syncData,
    updateExpense,
  } = useStorage(STORAGE_ID);

  const clearExpenseForm = () => {
    setFormExpense(defaultExpense);
  };

  let expensesFound =
    searchValue.length === 0
      ? expenses
      : expenses.filter((exp) => {
          const searchText = searchValue.toLowerCase();
          const descText = exp.description.toLowerCase();

          return descText.includes(searchText);
        });
  expensesFound = expensesFound.filter(
    (expense) => expense.status !== StorageStatus.DELETED
  );

  return (
    <ExpensesContext.Provider
      value={{
        budget,
        categories,
        expenses,
        expensesFound,
        formExpense,
        loading,
        searchValue,

        clearExpenseForm,
        deleteExpense,
        insertExpense,
        setSearchValue,
        syncData,
        updateExpense,
      }}
    >
      {props.children}
    </ExpensesContext.Provider>
  );
}

export { ExpensesContext, ExpensesProvider };
