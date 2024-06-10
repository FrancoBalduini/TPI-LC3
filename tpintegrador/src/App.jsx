//import Login from "./components/login/Login";
//import Register from "./components/register/Register";
//import Header from "./components/header/Header";
import ThemeProvider from "./components/context/Context";
import Header from "./components/header/Header";
import HeaderHome from "./components/headerHome/HeaderHome";
//import HeaderHome from "./components/headerHome/HeaderHome";
const App = () => {
  return (
    <ThemeProvider>
      
        <Header />
      
    </ThemeProvider>
  );
};

export default App;
