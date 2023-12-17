function SettingsView({ sincronize }: { sincronize: React.MouseEventHandler }) {
    return (
        <div>
            <button onClick={sincronize}>Sincronizar</button>
        </div>
    );
}

export default SettingsView;