import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { ThemeContext } from "../context/Context";
import Header from "../header/Header";
import "./Home.css";

const HeaderHome = () => {
  const { theme } = useContext(ThemeContext);
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigateToInfoUser = () => {
    navigate("/infoUser");
  };

  const handleNavigateToRegisterGuarderia = () => {
    navigate("/registerguarderia");
  };

  const handleNavigateToUserHome = () => {
    navigate("/userHome");
  };

  const getUsernameWithoutDomain = (email) => {
    return email.split("@")[0];
  };

  return (
    <>
      <Header />
      <div className={`lupa-input ${theme}`}>
        {loggedUser && loggedUser.role === "dueño" && (
          <button
            className={`boton-añade-guarderia zIndex5 ${theme}`}
            onClick={handleNavigateToRegisterGuarderia}
          >
            Añade tu guarderia
          </button>
        )}
        {loggedUser && loggedUser.role === "cliente" && (
          <button
            className={`boton-añade-guarderia zIndex5 ${theme}`}
            onClick={handleNavigateToUserHome}
          >
            Hacer una reserva
          </button>
        )}

        {loggedUser ? (
          <span
            className="nombre-usuario zIndex5"
            onClick={handleNavigateToInfoUser}
            style={{ cursor: "pointer" }}
          >
            {getUsernameWithoutDomain(loggedUser.email)}
          </span>
        ) : (
          <button className="iniciar-sesion zIndex5">Iniciar sesión</button>
        )}
      </div>
    </>
  );
};

export default HeaderHome;
