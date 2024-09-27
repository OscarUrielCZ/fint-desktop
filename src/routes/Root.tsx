import React from "react";
import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <nav>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Link to="/logout">Cerrar sesión</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
