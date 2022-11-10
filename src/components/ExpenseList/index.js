import React from 'react';

const styles = {
    margin: '0 1rem',
    padding: '0',
    listStyle: 'none'
};

function ExpenseList({children}) {
    return (
        <ul style={styles}>
            {children}
        </ul>
    );
}

export default ExpenseList;