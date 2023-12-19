const styles = {
    margin: '0 1rem',
    padding: '0',
    listStyle: 'none'
};

function ExpenseList({ children }: { children: JSX.Element[] }) {
    return (
        <ul style={styles}>
            { children }
        </ul>
    );
}

export default ExpenseList;