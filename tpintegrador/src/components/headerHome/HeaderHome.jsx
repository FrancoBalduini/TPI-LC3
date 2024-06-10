import Header from "../header/Header";
import "./Home.css";

const HeaderHome = () => {


  return (
    <>
    <Header />
      <div className="lupa-input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search zIndex5"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          type="search"
          className="input-busqueda zIndex5"
          placeholder="Buscar guarderia"
        />
        <button className="boton-añade-guarderia zIndex5">Añade tu guarderia</button>
        <button className="iniciar-sesion zIndex5">Iniciar sesión</button>
        
      </div>
      
    </>
  );
};

export default HeaderHome;
