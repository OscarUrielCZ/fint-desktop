import Header from "./components/Header";

export default function HomeView() {
    return (
        <div>
            <Header />
            <div>
                <button>NUEVO</button>
                <select name="period">
                    <option value="week">Semana</option>
                    <option value="fortnight">Quincena</option>
                    <option value="month">Mes</option>
                    <option value="year">Año</option>
                </select>
            </div>
            <div>
                <div>GAsto de hoy</div>
                <div>Otro super gasto de hoy</div>
            </div>
        </div>
    );
}