import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Settings({
  onSync,
  onClose,
}: {
  onSync: () => void;
  onClose: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "80%",
        backgroundColor: "white",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h4">Settings</Typography>
      <Button variant="outlined" onClick={onSync}>
        Sincronizar datos
      </Button>
      <Button variant="contained" color="error" onClick={onClose}>
        Cerrra
      </Button>
    </Box>
  );
}

export default Settings;
