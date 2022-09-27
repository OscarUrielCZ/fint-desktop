import React from 'react';

import { ExpensesProvider } from './context/ExpensesContext';
import AppUI from './AppUI';


function App() {
    return (
        <ExpensesProvider>
            <AppUI />
        </ExpensesProvider>
    );
}

export default App;
