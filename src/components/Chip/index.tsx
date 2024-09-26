import React, { MouseEventHandler } from "react";
import PropTypes from "prop-types";

import "./Chip.css";

function Chip({
  children,
  onClick,
  style,
}: {
  children: string;
  onClick: MouseEventHandler;
  style?: object;
}) {
  return (
    <div className="Chip" style={style} onClick={onClick}>
      {children}
    </div>
  );
}

Chip.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Chip;
