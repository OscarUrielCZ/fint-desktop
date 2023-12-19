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
            <select name="category">
                <option value="food">Comida</option>
                <option value="etc">Etc</option>
            </select>
        </div>
    );
}

export default Registry;