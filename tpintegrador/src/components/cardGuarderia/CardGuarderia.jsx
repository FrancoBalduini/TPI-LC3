import "./CardGuarderia.css";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";

const CardGuarderia = () => {
  const guarderias = [
    { foto: "Foto", descripcion: "Descripción de la guardería" },
    { foto: "Foto", descripcion: "Descripción de la guardería" },
    { foto: "Foto", descripcion: "Descripción de la guardería" },
    { foto: "Foto", descripcion: "Descripción de la guardería" },
  ];
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`guarderia-container ${theme}`}>
      <h2>Guarderia</h2>
      {guarderias.map((guarderia, index) => (
        <div key={index} className={`guarderia-item ${theme}`}>
          <div className="foto">{guarderia.foto}</div>
          <div className="descripcion">
            <p>{guarderia.descripcion}</p>
            <p>
              <span className="modificar">Modificar</span>{" "}
              <span className="icono">✏️</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGuarderia;
