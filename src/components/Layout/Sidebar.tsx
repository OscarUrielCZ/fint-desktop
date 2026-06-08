import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountBalanceWallet as IncomeIcon,
  ReceiptLong as ExpensesIcon,
  ShowChart as InvestmentsIcon,
  Category as CategoriesIcon,
  PieChart as BudgetIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../../config/routes.ts";

const drawerWidth = 240;

interface SidebarProps {
  version: string;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ version, mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" + routes.dashboard.path },
    { text: "Income", icon: <IncomeIcon />, path: "/" + routes.income.path },
    { text: "Expenses", icon: <ExpensesIcon />, path: "/" + routes.expenses.path },
    { text: "Investments", icon: <InvestmentsIcon />, path: "/" + routes.investments.path },
    { text: "Categories", icon: <CategoriesIcon />, path: "/" + routes.categories.path },
    { text: "Budget", icon: <BudgetIcon />, path: "/" + routes.budget.path },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onDrawerToggle(); // Close drawer on mobile after navigation
  };

  const handleAddExpense = () => {
    navigate("/" + routes.create.path);
    onDrawerToggle();
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar />
      
      <Box sx={{ p: 2, pt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddExpense}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            py: 1.2,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            boxShadow: `0 4px 12px ${theme.palette.primary.main}33`,
          }}
        >
          Add Expense
        </Button>
      </Box>

      <Box sx={{ overflow: "auto", mt: 1, flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  margin: "4px 8px",
                  borderRadius: "8px",
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}14`,
                    color: theme.palette.primary.main,
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.primary.main,
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: "0.9rem", 
                    fontWeight: location.pathname === item.path ? 600 : 400 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: "block", textAlign: "center" }}>
          Version {version}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: drawerWidth,
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
