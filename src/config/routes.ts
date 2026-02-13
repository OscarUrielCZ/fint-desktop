import CategoryView from "../views/Category/CategoryView.tsx";
import CreateView from "../views/Create/CreateView.tsx";
import HomeView from "../views/Home/HomeView.tsx";
import LoginView from "../views/Login/LoginView.tsx";
import UpdateView from "../views/Update/UpdateView.tsx";

export default {
    login: {
        path: "fint-desktop/login",
        element: LoginView,
    },
    home: {
        path: "fint-desktop/",
        element: HomeView,
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