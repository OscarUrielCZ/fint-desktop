import Chip from "../../components/Chip";

function Registry() {
    return (
        <div>
            <div>Buscar</div>
            <div>
                <Chip>Semana</Chip>
                <Chip>Mes</Chip>
                <Chip>Trimestre</Chip>
                <Chip>Semestre</Chip>
                <Chip>Año</Chip>
            </div>
        </div>
    );
}

export default Registry;