import Login from "./components/login/Login";
// // // // import Register from "./components/register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// // // // import ThemeProvider from "./components/context/Context";
// // // // import Header from "./components/header/Header";
// // // // import HeaderHome from "./components/headerHome/HeaderHome";
import HomePage from "./components/homePage/HomePage";
import Register from "./components/register/Register";
import UserHome from "./components/userHome/UserHome";
import GuarderiaPage from "./components/guarderiaPage/GuarderiaPage";
import Admin from "./components/admin/Admin";
// // import UserHome from "./components/userHome/UserHome";
// // //import GuarderiaPage from "./components/guarderiaPage/GuarderiaPage";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/home", element: <HomePage /> },
    { path: "/register", element: <Register /> },
    { path: "/userHome", element: <UserHome /> },
    { path: "/guarderia", element: <GuarderiaPage /> },
  ]);

  return (
    <>
      {/* <UserHome /> */}
      {<RouterProvider router={router} />}
    </>
  );
};

export default App;
