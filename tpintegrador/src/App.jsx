import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import HomePage from "./components/homePage/HomePage";
import UserHome from "./components/userHome/UserHome";
import GuarderiaPage from "./components/guarderiaPage/GuarderiaPage";
import Admin from "./components/admin/Admin";
import DuenoGuarderia from "./components/duenoGuarderia/DuenoGuarderia";
import InfoUser from "./components/infoUser/InfoUser";
import ProtectedRoute from "./components/protected/Protected";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <ProtectedRoute allowedRoles={["cliente", "admin"]} />,
      children: [
        { path: "/home", element: <HomePage /> },
        { path: "/userHome", element: <UserHome /> },
        { path: "/infouser", element: <InfoUser /> },
      ],
    },
    {
      element: <ProtectedRoute allowedRoles={["dueño", "admin"]} />,
      children: [
        { path: "/guarderia", element: <GuarderiaPage /> },
        { path: "/duenoguarderia", element: <DuenoGuarderia /> },
      ],
    },
    {
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [{ path: "/admin", element: <Admin /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
