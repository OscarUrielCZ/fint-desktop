import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";

import { ExpensesContext } from "../../context/ExpensesContext";
import { toDateObject } from "../../utils.ts";
import { Expense } from "../../common/types.ts";
import { generateRandomId } from "../../common/utils.ts";

const emptyExpense = {
  id: null,
  categoryId: "",
  subcategoryId: "",
  description: "",
  amount: "",
  date: moment(new Date()).format("YYYY-MM-DD"),
};

/**
 * Componente vista que sirve para crear nuevos egresos o también para editar ya existentes.
 * Para edición, se obtiene desde la url el ID del egreso a editar.
 */
function Create({ updatingExpense }: { updatingExpense: unknown }) {
  const navigate = useNavigate();
  const {
    categoriesAux: categories,
    insertExpense,
    updateExpense,
  } = useContext(ExpensesContext);

  const [error, setError] = useState<string>("");
  // TODO: revisar el tipo expense
  const [expense, setExpense] = useState<any>(updatingExpense || emptyExpense);

  const subcategories = categories[expense.categoryId]?.subcategories;

  const onCancel = () => {
    navigate(-1);
  };

  const onChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // validations
    if (!expense.categoryId) {
      setError("Debe seleccionar una categoría");
      return;
    }
    if (!expense.subcategoryId && Object.keys(subcategories).length > 0) {
      setError("Debe seleccionar una subcategoría");
      return;
    }
    setError("");

    let newExpense = expense;

    if (newExpense.id !== null) {
      // ya existe, i.e. es actualización
      newExpense.date = toDateObject(expense.date);
      updateExpense(newExpense);
    } else {
      // es nuevo
      newExpense.date = toDateObject(expense.date);
      newExpense.id = generateRandomId();
      insertExpense(newExpense);
    }

    console.log(newExpense);

    // TODO: factorizar rutas en un archivo general routes.js
    navigate("/fint-desktop/");
  };

  const onSelectCategoryId = (id: string) => {
    setExpense({
      ...expense,
      categoryId: id,
    });
  };

  const onSelectSubcategoryId = (id: string) => {
    setExpense({
      ...expense,
      subcategoryId: id,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" textAlign="center">
        Registrar egreso
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ px: 1 }}>
        <CategoryPicker
          title="Categoría"
          categories={categories}
          selectedCategory={expense.categoryId}
          setSelectedCategory={onSelectCategoryId}
        />

        {expense.categoryId.length !== 0 &&
          Object.keys(subcategories).length > 0 && (
            <CategoryPicker
              title="Subcategoría"
              categories={subcategories}
              selectedCategory={expense.subcategoryId}
              setSelectedCategory={onSelectSubcategoryId}
            />
          )}

        <NumericFormat
          value={expense.amount}
          onValueChange={({ floatValue }) =>
            setExpense({ ...expense, amount: floatValue })
          }
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 2,
          px: 1,
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
  title,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography>{title}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(max(100px, 30%), 1fr))",
          gap: 1,
        }}
      >
        {Object.entries(categories).map(([id, category]: [string, any]) => (
          <Card
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
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
    </Box>
  );
};

export default Create;
