import React from "react";

import { Expense } from "../../common/types";
import { numberWithCommas } from "../../common/utils";

import "./ResumeExpenses.css";

function ResumeExpenses({ expenses }: { expenses: Expense[] }) {

    let totalAmount: number = expenses.reduce((accumulator: number, currentValue: Expense) => 
        accumulator+Number(currentValue.amount), 0);
    let expensesCount: number = expenses.length;

    // useEffect(() => {
    //     totalAmount = 0;

    //     for(let i=0; i<expensesCount; i++) {
    //         totalAmount += expenses[i].amount;
    //     }

    //     console.log("render", totalAmount);

    // }, [expenses]);

    return (
        <div>
            <p className="stat-sentence">Cantidad gastada: ${numberWithCommas(totalAmount)}</p>
            <p className="stat-sentence">Total de movimientos: {expensesCount}</p>

            <h3>Gastos por categoría</h3>

        </div>
    );

}

export default ResumeExpenses;