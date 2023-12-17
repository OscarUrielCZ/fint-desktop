import useExpensesStorage from "../../hooks/useExpensesStorage";
import SettingsView from "./SettingsView";

function Settings() {
    const { updateData } = useExpensesStorage("fint-v2");

    return <SettingsView sincronize={updateData} />;
}

export default Settings;