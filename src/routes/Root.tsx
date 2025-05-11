import React from "react";
import { Outlet } from "react-router-dom";

import { signOut } from "firebase/auth";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { auth } from "../firebase";

function Root() {
  const logout = () => {
    signOut(auth);
  };

  return (
    <>
      <AppBar position="static">
        <Typography>App versión: 0.2.3</Typography>
        <Button variant="contained" color="info" onClick={logout}>
          Cerrar sesión
        </Button>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default Root;
