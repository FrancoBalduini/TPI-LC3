import Login from "./components/login/Login";
// import Register from "./components/register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ThemeProvider from "./components/context/Context";
// import Header from "./components/header/Header";
// import HeaderHome from "./components/headerHome/HeaderHome";
import HomePage from "./components/homePage/HomePage";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/home", element: <HomePage /> },
    // Agrega otras rutas según sea necesario
  ]);

  return <ThemeProvider>{<RouterProvider router={router} />}</ThemeProvider>;
};

export default App;
