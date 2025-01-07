import React from "react";

import Home from "../views/Home/index.tsx";

// import { Link, Outlet } from "react-router-dom";

// function MainRoutes() {
//   return (
//     <>
//       <nav>
//         <ul style={{ listStyle: "none" }}>
//           <li>
//             <Link to="/login">Cerrar sesión</Link>
//           </li>
//         </ul>
//       </nav>
//       <div>
//         <Outlet />
//       </div>
//     </>
//   );
// }

// export default Root;

const MainRoutes = {
  path: "/",
  element: <div>Dentro de la app</div>,
  children: [
    {
      path: "/home",
      element: <Home />,
    },
  ],
};

export default MainRoutes;
