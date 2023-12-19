import { CategorySpending, Expense } from "../../common/types";
import useExpensesStorage from "../../hooks/useExpensesStorage";

import HomeView from "./HomeView";

function Home() {
    const { expenses } = useExpensesStorage("fint-v2");
    
    const monthExpenses: Expense[] = [];
    let biggestExpense: Expense | null = null;
    let biggestCategory: CategorySpending | null = null;
    let totalSpent = 0;
    let budget = 3000;

    const currDate = new Date();
    const catsSpending = new Map();

    expenses.forEach((e) => {
        if (e.date.getMonth() === currDate.getMonth() && e.date.getFullYear() === currDate.getFullYear()) {
            monthExpenses.push(e);

            totalSpent += e.amount;

            if (biggestExpense === null || e.amount > biggestExpense.amount)
                biggestExpense = e;
            if (!catsSpending.has(e.category))
                catsSpending.set(e.category, 0);
            catsSpending.set(e.category, catsSpending.get(e.category) + e.amount);
        }
    });

    catsSpending.forEach((amount, cat) => {
        if (biggestCategory === null || amount >= biggestCategory.speding)
            biggestCategory = {
                category: cat,
                speding: amount
            }
    });

    return <HomeView 
                biggestCategory={biggestCategory}
                biggestExpense={biggestExpense}
                expenses={monthExpenses}
                spent={totalSpent} 
                remaining={budget-totalSpent}
                />;  
}

export default Home;