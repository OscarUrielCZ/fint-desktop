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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import moment from "moment";

import { ExpensesContext } from "../../context/ExpensesContext.js";
import { toDateObject } from "../../utils.ts";
// import { Expense } from "../../common/types.ts";
import { generateRandomId } from "../../common/utils.ts";
import { StorageStatus } from "../../common/types.ts";

const emptyExpense = {
  id: null,
  categoryId: "",
  subcategoryId: "",
  description: "",
  amount: "",
  paymentType: "cash",
  months: "1",
  date: moment(new Date()).format("YYYY-MM-DD"),
  creditOperationId: null,
};

/**
 * Componente vista que sirve para crear nuevos egresos o también para editar ya existentes.
 * Para edición, se obtiene desde la url el ID del egreso a editar.
 */
function CreateView({ updatingExpense }: { updatingExpense: unknown }) {
  const navigate = useNavigate();
  const { categories, insertExpense, updateExpense, saveMany } =
    useContext(ExpensesContext);

  const [error, setError] = useState<string>("");
  // TODO: revisar el tipo expense
  const [expense, setExpense] = useState<any>(updatingExpense || emptyExpense);

  const subcategories = categories[expense.categoryId]?.subcategories;

  const onCancel = () => {
    navigate(-1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    if (expense.id !== null) { // Id already exists, so it's an update
      const updatedExpense = {
        ...expense,
        date: toDateObject(expense.date),
      };
      updateExpense(updatedExpense);
    } else { // No Id, so it's a new expense
      if (expense.paymentType === "interest-free") {
        const creditOperationId = generateRandomId();
        const n = parseInt(expense.months);
        const monthlyAmount = expense.amount / n;
        const expensesToSave = [];

        for (let i = 1; i <= n; i++) {
          const date = moment(expense.date, "YYYY-MM-DD")
            .add(i - 1, "months")
            .toDate();
          const description = `${expense.description || ""} (${i}/${n})`.trim();

          const newExpensePart = {
            ...expense,
            
            id: generateRandomId(),
            creditOperationId,
            amount: monthlyAmount,
            date,
            description,
            status: StorageStatus.NEW,
          };
          expensesToSave.push(newExpensePart);
        }
        saveMany(expensesToSave);
      } else {
        const newExpense = {
          ...expense,
          id: generateRandomId(),
          date: toDateObject(expense.date),
        };
        insertExpense(newExpense);
      }
    }

    // TODO: factorizar rutas en un archivo general routes.js
    navigate(-1);
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

        {/* aparecen subcategorías si hay categoría seleccionada */}
        {Boolean(expense.categoryId) &&
          expense.categoryId.length !== 0 &&
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

        <ToggleButtonGroup
          color="primary"
          value={expense.paymentType}
          exclusive
          onChange={(_, newPaymentType) => {
            if (newPaymentType !== null) {
              setExpense({ ...expense, paymentType: newPaymentType });
            }
          }}
          aria-label="Tipo de pago"
          fullWidth
          sx={{ mt: 2 }}
        >
          <ToggleButton value="cash">Efectivo</ToggleButton>
          <ToggleButton value="interest-free">Meses sin intereses</ToggleButton>
        </ToggleButtonGroup>

        {expense.paymentType === "interest-free" && (
          <NumericFormat
            value={expense.months}
            onValueChange={({ floatValue }) =>
              setExpense({ ...expense, months: floatValue })
            }
            name="months"
            customInput={TextField}
            variant="standard"
            label="Número de meses"
            sx={{ width: "100%", mt: 2 }}
            decimalScale={0}
            allowNegative={false}
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue === undefined || floatValue > 0;
            }}
            required
          />
        )}

        {expense.paymentType === "interest-free" &&
          expense.amount > 0 &&
          expense.months > 0 && (
            <Typography variant="body1" sx={{ mt: 1, display: "block" }}>
              Pago mensual estimado: $
              {(expense.amount / expense.months).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          )}

        <TextField
          value={expense.date}
          onChange={onChange}
          name="date"
          type="date"
          variant="standard"
          label={
            expense.paymentType === "cash" ? "Fecha" : "Fecha de corte"
          }
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

export default CreateView;
