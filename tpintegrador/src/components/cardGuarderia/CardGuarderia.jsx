import "./CardGuarderia.css";
import { useContext } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";

const CardGuarderia = () => {
  const { theme } = useContext(ThemeContext);
  const { loggedUser, guarderiaList } = useContext(AuthContext);

  // Filtrar las guarderías asignadas al dueño logeado
  const guarderiasAsignadas = guarderiaList.filter(
    (guarderia) => guarderia.name && guarderia.name.dueñoId === loggedUser.id
  );

  return (
    <div className={`guarderia-container ${theme}`}>
      <h2>Guarderías</h2>
      {guarderiasAsignadas.length > 0 ? (
        guarderiasAsignadas.map((guarderia) => (
          <div key={guarderia.id} className={`guarderia-item ${theme}`}>
            <div className="descripcion">
              <p>Nombre: {guarderia.name.name}</p>
              <p>Dirección: {guarderia.name.address}</p>
              <p>Área: {guarderia.name.area}</p>
              <p>Medicación: {guarderia.name.medication ? "Sí" : "No"}</p>
              <p>Espacio abierto: {guarderia.name.openSpace ? "Sí" : "No"}</p>
              <p>Paseador: {guarderia.name.walker ? "Sí" : "No"}</p>
              <p>
                <span className="modificar">Modificar</span>{" "}
                <span className="icono">✏️</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes guarderías asignadas.</p>
      )}
    </div>
  );
};

export default CardGuarderia;
