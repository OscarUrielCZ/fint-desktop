import React from "react";
import PropTypes from "prop-types";

const styles = {
    container: {
        backgroundColor: "#ddd",
        borderRadius: "50%",
        display: "inline-block",
        padding: 5
    }
};

function Chip({ children, style }: { children: string, style?: object }) {
    return (
        <div style={{...styles.container, ...style}}>
            { children }
        </div>
    );
}

Chip.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default Chip;