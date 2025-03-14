import React, { useState, useContext } from "react";
import moment from "moment";
import { NumericFormat } from "react-number-format";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { ExpensesContext } from "../../context/ExpensesContext";
import { toDateObject } from "../../utils.ts";

function Create() {
  const {
    categoriesAux: categories,
    formExpense,
    insertExpense,
    setOpenModal,
    updateExpense,
  } = useContext(ExpensesContext);

  const [expense, setExpense] = useState(formExpense);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  console.log({ selectedCategoryId });
  console.log(categories[selectedCategoryId]?.subcategories || "Nada");

  const onChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const onCancel = () => {
    // setOpenModal(false);
    console.log("cancel");
  };

  const generateTempIndex = (description, date) => {
    return description.replace(" ", "_") + moment(date).format("YYYY-MM-DD");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log("submit");

    // if (expense.id !== undefined) {
    //   // ya existe, i.e. es actualización
    //   let updatedExpense = expense;
    //   updatedExpense.date = toDateObject(expense.date);
    //   updateExpense(updatedExpense);
    // } else {
    //   // es nuevo
    //   let newExpense = expense;
    //   newExpense.date = toDateObject(expense.date);
    //   newExpense.id = generateTempIndex(expense.description, newExpense.date);
    //   insertExpense(newExpense);
    // }
    // setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" textAlign="center">
        Registrar egreso
      </Typography>

      <CategoryPicker
        categories={categories}
        selectedCategory={selectedCategoryId}
        setSelectedCategory={setSelectedCategoryId}
      />

      {selectedCategoryId.length !== 0 &&
        categories[selectedCategoryId].subcategories && (
          <Typography variant="h6" textAlign="center">
            Hola
          </Typography>
        )}

      <NumericFormat
        value={expense.amount}
        onChange={onChange}
        name="amount"
        customInput={TextField}
        variant="standard"
        label="Cantidad"
        sx={{ width: "100%", mt: 2 }}
        decimalScale={2}
        thousandSeparator
        valueIsNumericString
        prefix="$"
        required
      />
      <TextField
        value={expense.date}
        onChange={onChange}
        name="date"
        type="date"
        variant="standard"
        label="Fecha"
        sx={{ width: "100%", mt: 2 }}
        required
      />
      <TextField
        value={expense.description}
        onChange={onChange}
        name="description"
        variant="standard"
        label="Descripción (opcional)"
        sx={{ width: "100%", mt: 2 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 1 }}
        >
          Guardar
        </Button>
      </Box>
    </form>
  );
}

const CategoryPicker = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(max(100px, 30%), 1fr))",
        gap: 1,
      }}
    >
      {Object.entries(categories).map(([id, category]: [string, any]) => (
        <Card key={id}>
          <CardActionArea>
            <CardContent
              onClick={() => setSelectedCategory(id)}
              data-active={selectedCategory === id ? "" : undefined}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <Typography textAlign="center">
                {category.displayValue}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default Create;
