import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add, Logout, Settings as SettingsIcon } from "@mui/icons-material";

import { auth } from "../firebase";
import routes from "../config/routes.ts";
import Modal from "../modals/Modal.js";
import Settings from "../components/Settings/Settings.tsx";
import { ExpensesContext } from "../context/ExpensesContext.js";
import { toast } from "react-toastify";

function Root() {
  const navigate = useNavigate();
  const { syncData } = useContext(ExpensesContext);
  const [openModal, setOpenModal] = useState(false);
  const [loadingSync, setLoadingSync] = useState(false);

  const logout = () => {
    signOut(auth);
  };

  const handleAddExpense = () => {
    navigate(routes.create.path);
  };

  const handleSyncData = async () => {
    try {
      setLoadingSync(true);
      await syncData();
      toast.success("Datos sincronizados correctamente!");
      setOpenModal(false);
    } catch (error) {
      toast.error("Error al sincronizar los datos");
      console.error(error);
    } finally {
      setLoadingSync(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>v0.2.6</Typography>
          <IconButton
            color="inherit"
            aria-label="add expense"
            onClick={handleAddExpense}
            sx={{ backgroundColor: "primary.main", "&:hover": { backgroundColor: "primary.dark" } }}
          >
            <Add /> <Typography> NUEVO</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="settings"
            onClick={() => setOpenModal(true)}
            sx={{ marginLeft: 2, "&:hover": { backgroundColor: "secondary.dark" } }}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={logout}
            sx={{ marginLeft: 2, "&:hover": { backgroundColor: "secondary.dark" } }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4, p: 2 }}>
        <Outlet />
      </Box>
      {openModal && (
        <Modal>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              minWidth: 300,
            }}
          >
            <Settings
              onSync={handleSyncData}
              onClose={() => setOpenModal(false)}
              loading={loadingSync}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}

export default Root;
