import React, { useContext } from 'react';

import './AddButton.css'

import { ExpensesContext } from '../../context/ExpensesContext';

function AddButton() {
    const { setOpenModal, clearExpenseForm } = useContext(ExpensesContext);

    const showHideModal = () => {
        clearExpenseForm();
        setOpenModal(prevState => !prevState);
    };

    return (
        <button className="AddButton" onClick={ showHideModal }>+</button>
    );
}

export default AddButton;