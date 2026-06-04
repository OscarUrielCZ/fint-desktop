import { useState, createContext, useMemo } from "react";

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
    saveMany,
    updateExpense,
  } = useStorage(STORAGE_ID);

  const clearExpenseForm = () => {
    setFormExpense(defaultExpense);
  };

  const expensesFound = useMemo(() => {
    let filtered =
      searchValue.length === 0
        ? expenses
        : expenses.filter((exp) => {
            const searchText = searchValue.toLowerCase();
            const descText = exp.description.toLowerCase();

            return descText.includes(searchText);
          });
    return filtered.filter(
      (expense) => expense.status !== StorageStatus.DELETED
    );
  }, [expenses, searchValue]);

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
        saveMany,
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
