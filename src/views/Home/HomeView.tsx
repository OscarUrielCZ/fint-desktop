import { CategorySpending, Expense } from "../../common/types";
import CategorySpendingCard from "../../components/CategorySpendingCard";
import ExpenseItem from "../../components/ExpenseItem";

import ExpenseList from "../../components/ExpenseList";
import Header from "./components/Header";

type HomeViewProps = {
    biggestCategory: CategorySpending | null,
    biggestExpense: Expense | null,
    expenses: Expense[],
    remaining: number, 
    spent: number
};

export default function HomeView({ 
        biggestCategory,
        biggestExpense,
        expenses, 
        remaining, 
        spent }: HomeViewProps ) {
    return (
        <div>
            <Header spent={spent} remaining={remaining} />
            <div>
                <button>NUEVO</button>
            </div>
            <div>
                <div>Has gastado más en</div>
                { Boolean(biggestCategory) && <CategorySpendingCard category={biggestCategory as CategorySpending} /> }
                <div>Tu mayor gasto del mes</div>
                { Boolean(biggestExpense) && <ExpenseItem expense={biggestExpense as Expense} /> }
            </div>
            <div>
                <span>Estos son tus gastos del mes</span>
                <ExpenseList>
                    { expenses.map((e) => (<ExpenseItem key={e.id} expense={e} />)) }
                </ExpenseList>
            </div>
        </div>
    );
}