import React from "react";

function NotFound() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h2>¡Ups!</h2>
            <p>No se encontró la página que estás buscando</p>
            <a href="/">Regresar al inicio</a>
        </div>

    );
}

export default NotFound;