import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./CardGuarderia.css";

const CardGuarderia = () => {
  const { theme } = useContext(ThemeContext);
  const { loggedUser, guarderiaList, updateGuarderia } =
    useContext(AuthContext);

  const [editingGuarderia, setEditingGuarderia] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    area: "",
    medication: "", // Medication is now a string to handle radio buttons
    openSpace: false,
    walker: false,
  });

  useEffect(() => {
    if (editingGuarderia) {
      setFormState(editingGuarderia);
    }
  }, [editingGuarderia]);

  const guarderiasAsignadas = guarderiaList.filter(
    (guarderia) => guarderia.dueñoId === loggedUser.id
  );

  const handleModifyClick = (guarderia) => {
    setEditingGuarderia(guarderia);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGuarderia({ ...formState, id: editingGuarderia.id });
      setEditingGuarderia(null); // Close edit mode after saving
    } catch (error) {
      console.error("Error saving guardería:", error);
    }
  };

  const handleCancel = () => {
    setEditingGuarderia(null); // Close edit mode
  };

  return (
    <div className={`guarderia-container ${theme}`}>
      <h2>Guarderías</h2>
      {guarderiasAsignadas.length > 0 ? (
        guarderiasAsignadas.map((guarderia) => (
          <div key={guarderia.id} className={`guarderia-item ${theme}`}>
            <div className="descripcion">
              <p>Nombre: {guarderia.name}</p>
              <p>Dirección: {guarderia.address}</p>
              <p>Área: {guarderia.area}</p>
              <p>Medicación: {guarderia.medication === "si" ? "Sí" : "No"}</p>
              <p>Espacio abierto: {guarderia.openSpace ? "Sí" : "No"}</p>
              <p>Paseador: {guarderia.walker ? "Sí" : "No"}</p>
              <p>
                <span
                  className="modificar"
                  onClick={() => handleModifyClick(guarderia)}
                >
                  Modificar
                </span>{" "}
                <span className="icono">✏️</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes guarderías asignadas.</p>
      )}

      {editingGuarderia && (
        <div className="edit-form">
          <h3>Editar Guardería</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={formState.name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="address"
                value={formState.address || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Área:
              <select
                name="area"
                value={formState.area || ""}
                onChange={handleChange}
              >
                <option value="">Zona</option>
                <option value="norte">Zona Norte</option>
                <option value="sur">Zona Sur</option>
                <option value="este">Zona Este</option>
                <option value="oeste">Zona Oeste</option>
                <option value="centro">Zona Centro</option>
              </select>
            </label>
            <label>Medicación:</label>
            <label>
              <input
                type="radio"
                name="medication"
                value="si"
                checked={formState.medication === "si"}
                onChange={handleChange}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="medication"
                value="no"
                checked={formState.medication === "no"}
                onChange={handleChange}
              />
              No
            </label>
            <label>
              Espacio abierto:
              <input
                type="checkbox"
                name="openSpace"
                checked={formState.openSpace || false}
                onChange={handleChange}
              />
            </label>
            <label>
              Paseador:
              <input
                type="checkbox"
                name="walker"
                checked={formState.walker || false}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CardGuarderia;