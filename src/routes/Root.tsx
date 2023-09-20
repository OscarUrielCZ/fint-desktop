import React from "react";
import { Link, Outlet } from "react-router-dom";

function Root() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/presupuesto">Presupuesto</Link>
                    </li>
                    <li>
                        <Link to="/registro">Registro</Link>
                    </li>
                    <li>
                        <Link to="/configuracion">Configuración</Link>
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