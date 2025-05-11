import React from "react";
import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <nav>
        <ul style={{ listStyle: "none" }}>
          <li>App versión: 0.2.3</li>
          <li>
            <Link to="fint-desktop/login">Cerrar sesión</Link>
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
