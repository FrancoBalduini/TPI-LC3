//import Login from "./components/login/Login";
//import Register from "./components/register/Register";
import ThemeProvider from "./components/context/Context";
//import Header from "./components/header/Header";
import HeaderHome from "./components/headerHome/HeaderHome";

const App = () => {
  return (
    <ThemeProvider>
      
        <HeaderHome />
      
    </ThemeProvider>
  );
};

export default App;
