import React from "react";

import { Alert, Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";

function Login() {
  const [email, setEmaiil] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();

  const authenticate = () => {
    if (!email || !password) {
      setError("Escribe tu correo y contraseña");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/fint-desktop/");
      })
      .catch(() => {
        setError("Correo o contraseña incorrectas");
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <TextField
        placeholder="Nombre de usuario"
        value={email}
        onChange={(e) => setEmaiil(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error.length > 0 && <Alert severity="error">{error}</Alert>}
      <Button variant="contained" onClick={authenticate}>
        Ingresar
      </Button>
    </Box>
  );
}

export default Login;
