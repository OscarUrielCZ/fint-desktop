import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
  return (
    <div>
      <input type="text" placeholder="Nombre de usuario" className="field" />
      <input type="password" placeholder="Contraseña" className="field" />
      <button className="login-button">
        <Link to="/">Iniciar sesión</Link>
      </button>
    </div>
  );
}

export default Login;
