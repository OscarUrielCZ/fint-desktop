import React from "react";

import Chip from "../../components/Chip";

function Home() {
    return (
        <div>
            <div>
                <Chip>Semana</Chip>
                <Chip>Mes</Chip>
                <Chip>Trimestre</Chip>
                <Chip>Semestre</Chip>
                <Chip>Año</Chip>
            </div>
            <div>
                Gráfica
            </div>
            <div>
                Último gasto registrado
                Mayor gastro registrado
            </div>
        </div>
    );
}

export default Home;