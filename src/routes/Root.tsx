import React, { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Box, Toolbar, CssBaseline } from "@mui/material";
import { toast } from "react-toastify";

import { auth } from "../firebase";
import Modal from "../modals/Modal.js";
import Settings from "../components/Settings/Settings.tsx";
import { ExpensesContext } from "../context/ExpensesContext.js";
import Sidebar from "../components/Layout/Sidebar.tsx";
import TopBar from "../components/Layout/TopBar.tsx";

const drawerWidth = 240;

function Root() {
  const { syncData } = useContext(ExpensesContext);
  const [openModal, setOpenModal] = useState(false);
  const [loadingSync, setLoadingSync] = useState(false);
  const location = useLocation();

  // Don't show sidebar/topbar on login page
  const isLoginPage = location.pathname.includes("/login");

  const logout = () => {
    signOut(auth);
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

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar
        onSettingsOpen={() => setOpenModal(true)}
        onLogout={logout}
      />
      <Sidebar version="v0.3.0" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Toolbar /> {/* Space for TopBar */}
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
    </Box>
  );
}

export default Root;
