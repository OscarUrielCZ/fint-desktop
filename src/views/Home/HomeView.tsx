import { useContext, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";

// import AddButton from "../../components/AddButton/";
import Modal from "../../modals/Modal.js";
import CategoryGridStatistics from "../../components/Statistics/CategoryGridStatistics.tsx";
import ExpenseList from "../../components/ExpenseList/ExpenseList.tsx";
import ExpenseSearch from "../../components/ExpenseSearch/ExpenseSearch.tsx";
// import LoadingExpenses from "../../components/LoadingExpenses/index.js";
import PeriodFilters from "../../components/Filters/PeriodFilters.tsx";
import ResumeExpenses from "../../components/ResumeExpenses/index.tsx";

import colors from "../../common/colors.ts";
import { DATE_PARAM_FORMAT } from "../../common/constants.ts";
import { ExpensesContext } from "../../context/ExpensesContext.js";
import Settings from "../../components/Settings/Settings.tsx";
import { Period } from "../../common/types.ts";
import { Expense } from "../../models/Expense.dto.ts";

// TODO: eliminar parametros del URL, se compartirán mediante el context
// TODO: hacer un budget mensual, este se va a generar uno nuevo cada mes con los valores del mes anterior y el usuario tendrá que confirmarlo, este budget se usará para hacer gráficas de barras y de puntos (combinada, puntos el budget esperado y barras el gasto real)
function HomeView() {
  const { budget, categories, expensesFound, loading, syncData } =
    useContext(ExpensesContext);

  const today = moment();
  const [defaultPeriodType, setDefaultPeriodType] = useState<Period>(
    Period.MONTH
  );
  const [period, setPeriod] = useState<[string, string]>([
    today.startOf(defaultPeriodType as any).format(DATE_PARAM_FORMAT),
    today.endOf(defaultPeriodType as any).format(DATE_PARAM_FORMAT),
  ]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const expensesFiltered = expensesFound.filter((expense: Expense) => {
    return (
      period[0] !== null &&
      period[1] !== null &&
      expense.date.getTime() >= new Date(period[0]).getTime() &&
      expense.date.getTime() <= new Date(period[1]).getTime()
    );
  });

  const totalBudget =
    budget?.items?.reduce((acc, item) => {
      return acc + Number(item.amount);
    }, 0) || 0;
  let expenseQuantity: number = 0;
  let expensesCount: number = expensesFiltered.length;

  expensesFiltered.forEach((expense) => {
    expenseQuantity += Number(expense.amount);
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: colors.background,
        padding: 1,
        marginBottom: 6,
      }}
    >
      <Box>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ float: "right" }}
        >
          Configuración
        </Button>
      </Box>
      {period[0] !== null && period[1] !== null && (
        <PeriodFilters
          period={period}
          setPeriod={setPeriod}
          periodType={defaultPeriodType}
          setPeriodType={setDefaultPeriodType}
        />
      )}
      {/* TODO: quitar barra de busqueda y eliminar su valor del context */}
      <ExpenseSearch />
      <ResumeExpenses
        totalBudget={totalBudget}
        expenseQuantity={expenseQuantity}
        expensesCount={expensesCount}
      />
      <CategoryGridStatistics
        categories={categories}
        expenses={expensesFiltered}
        totalAmount={expenseQuantity}
        budget={budget}
      />
      {/* TODO: quitar registros del home y dejar solo los 3 últimos */}
      <ExpenseList
        title="Últimos gastos"
        items={expensesFiltered}
        categories={categories}
      />
      {/* <AddButton /> */}
      <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Button variant="contained" fullWidth>
          <Link to="create" style={{ color: "white", textDecoration: "none" }}>
            Registrar
          </Link>
        </Button>
      </Box>

      {openModal && (
        <Modal>
          <Settings onSync={syncData} onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </Box>
  );
}

export default HomeView;
