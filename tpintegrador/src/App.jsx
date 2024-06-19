//import Login from "./components/login/Login";
//import Register from "./components/register/Register";
import ThemeProvider from "./components/context/Context";
//import Header from "./components/header/Header";
//import HeaderHome from "./components/headerHome/HeaderHome";
import HomePage from "./components/homePage/HomePage";

const App = () => {
  return (
    <ThemeProvider>
      
        <HomePage />
      
    </ThemeProvider>
  );
};

export default App;
