import { Expense } from "../../common/types";
import useExpensesStorage from "../../hooks/useExpensesStorage";
import Header from "./components/Header";

export default function HomeView() {
    const { expenses } = useExpensesStorage("fint-v2");

    const currDate = new Date();

    const monthExpenses = expenses.filter((e: Expense) => (e.date.getMonth() === currDate.getMonth() && e.date.getFullYear() === currDate.getFullYear()));

    console.log(monthExpenses);

    return (
        <div>
            <Header />
            <div>
                <button>NUEVO</button>
                <select name="period">
                    <option value="month">Mes</option>
                    <option value="year">Año</option>
                </select>
            </div>
            <div>
                <div>GAsto de hoy</div>
                <div>Otro super gasto de hoy</div>
            </div>
        </div>
    );
}