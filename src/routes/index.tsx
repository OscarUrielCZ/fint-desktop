import { useRoutes } from "react-router-dom";

import LoginRoutes from "./LoginRoutes.tsx";
import MainRoutes from "./MainRoutes.tsx";

export default function Routes() {
  return useRoutes([LoginRoutes, MainRoutes]);
}
