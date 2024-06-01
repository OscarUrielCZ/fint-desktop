import React, { MouseEventHandler } from "react";
import PropTypes from "prop-types";

const styles = {
    container: {
        backgroundColor: "#ddd",
        borderRadius: "50%",
        display: "inline-block",
        padding: 5
    }
};

function Chip({ children, onClick, style }: { children: string, onClick: MouseEventHandler, style?: object }) {
    return (
        <div style={{...styles.container, ...style}} onClick={onClick}>
            { children }
        </div>
    );
}

Chip.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default Chip;