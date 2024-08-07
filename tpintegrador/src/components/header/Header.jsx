import { useContext, useEffect } from "react";
import "./Header.css";
import { ThemeContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  
  const handleBackHome = (e) => {
    e.preventDefault();
    if (loggedUser.role === "cliente") {
      navigate("/home");
    } else if (loggedUser.role === "dueño") {
      navigate("/duenoguarderia");
    }
  };

  useEffect(() => {
    const header = document.querySelector(".header");
    header.style.backgroundColor = theme === "light" ? "#b1dcff" : "#586e80"; // Ajusta el color de fondo según el tema
  }, [theme]);

  return (
    <div>
      <header className={`header ${theme}`}>
        <div className="header-left">
          <div className="pata">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24">
              <path d="M6.217 12.486c1.964-.422 1.693-2.772 1.637-3.287-.096-.788-1.028-2.172-2.291-2.061-1.588.141-1.821 2.44-1.821 2.44-.216 1.06.515 3.33 2.475 2.908m3.646-3.944c1.084 0 1.959-1.251 1.959-2.792 0-1.537-.871-2.785-1.955-2.785-1.086 0-1.966 1.242-1.966 2.785s.88 2.792 1.965 2.792m4.671.186c1.454.195 2.38-1.355 2.568-2.53.188-1.166-.754-2.528-1.776-2.763-1.031-.237-2.303 1.411-2.431 2.484-.136 1.318.188 2.627 1.634 2.813m5.751 1.973c0-.562-.46-2.253-2.19-2.253-1.729 0-1.965 1.596-1.965 2.726 0 1.077.089 2.573 2.247 2.528 2.148-.052 1.913-2.438 1.913-3.002M18.1 15.626s-2.247-1.739-3.557-3.613c-1.776-2.768-4.304-1.64-5.144-.239-.845 1.418-2.153 2.306-2.339 2.544-.188.232-2.709 1.596-2.147 4.079.563 2.483 2.528 2.439 2.528 2.439s1.446.142 3.133-.234c1.686-.375 3.13.091 3.13.091s3.92 1.317 5.005-1.212c1.072-2.537-.61-3.847-.61-3.847" />
            </svg>
          </div>
          <a  onClick={handleBackHome} className="header-text">Happy Pet</a>
        </div>
        <div className="header-right">
          <div className="theme-selector" onClick={toggleTheme}>
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-moon-stars"
                viewBox="0 0 16 16">
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-brightness-high"
                viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
              </svg>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
