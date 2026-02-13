import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

function Settings({
  onSync,
  onClose,
  loading,
}: {
  onSync: () => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        textAlign: "center",
        backgroundColor: "white"
      }}
    >
      <Typography variant="h4">Settings</Typography>
      <Button variant="outlined" onClick={onSync} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Sincronizar datos"}
      </Button>
      <Button variant="contained" color="error" onClick={onClose}>
        Cerrar
      </Button>
    </Box>
  );
}

export default Settings;
