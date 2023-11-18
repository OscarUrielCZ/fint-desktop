export default function Header() {
    return (
        <div style={styles.container}>
            <span style={styles.subtitle}>Total gastado</span>
            <span style={styles.title}>$4,235.90</span>
            <span style={styles.subtitle2}>Sobrante</span>
            <span style={styles.subtitle}>$1,364.10</span>
        </div>
    );
}

// #F6C0D0
// #D0A5C0
// #8E7C93
// #485665
// #1E3231
const styles = {
    container: {
        backgroundColor: "#F6C0D0",
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center"
    },
    title: {
        fontHeight: "600",
        fontSize: "24pt",
        marginBottom: "1rem",
    },
    subtitle: {
        fontHeight: "500",
        fontSize: "18pt",
        margin: "1rem 0",
    },
    subtitle2: {
        fontHeight: "400",
        fontSize: "16pt",
    }
};