import React, { useContext } from 'react';
import './ExpenseSearch.css';

import { ExpensesContext } from '../context/ExpensesContext';

function ExpenseSearch() {
    const { searchValue : state, setSearchValue : setState } = useContext(ExpensesContext);

    const onChangeValue = event => {
        setState(event.target.value);
    };

    return (
        <input 
            type="text" 
            placeholder="Busca algún gasto"
            className="ExpenseSearch"
            value={state}
            onChange={event => onChangeValue(event)}
            />
    );
}

export default ExpenseSearch;