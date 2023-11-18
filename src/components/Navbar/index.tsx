import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ backgroundColor: "#F6C0D0"}}>
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
    );
}

export default Navbar;