import CategoryView from "../views/Category/CategoryView.tsx";
import CreateView from "../views/Create/CreateView.tsx";
import HomeView from "../views/Home/HomeView.tsx";
import LoginView from "../views/Login/LoginView.tsx";
import UpdateView from "../views/Update/UpdateView.tsx";
import DashboardView from "../views/Dashboard/DashboardView.tsx";
import IncomeView from "../views/Income/IncomeView.tsx";
import InvestmentsView from "../views/Investments/InvestmentsView.tsx";
import BudgetView from "../views/Budget/BudgetView.tsx";
import CategoryListView from "../views/Category/CategoryListView.tsx";

export default {
    login: {
        path: "fint-desktop/login",
        element: LoginView,
    },
    dashboard: {
        path: "fint-desktop/dashboard",
        element: DashboardView,
    },
    income: {
        path: "fint-desktop/income",
        element: IncomeView,
    },
    expenses: {
        path: "fint-desktop/",
        element: HomeView,
    },
    investments: {
        path: "fint-desktop/investments",
        element: InvestmentsView,
    },
    budget: {
        path: "fint-desktop/budget",
        element: BudgetView,
    },
    categories: {
        path: "fint-desktop/categories",
        element: CategoryListView,
    },
    create: {
        path: "fint-desktop/create",
        element: CreateView,
    },
    update: {
        path: "fint-desktop/update/:id",
        element: UpdateView,
    },
    category: {
        path: "fint-desktop/category/:id",
        element: CategoryView,
    },
};
