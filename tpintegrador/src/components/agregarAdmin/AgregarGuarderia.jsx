import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";
import "./AgregarGuarderia.css";

const AgregarGuarderia = ({ onClose }) => {
  const { addGuarderia } = useContext(AuthContext);
  const [newGuarderia, setNewGuarderia] = useState({
    name: "",
    address: "",
    area: "",
    medication: "No",
    openSpace: false,
    walker: false,
    dueñoId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGuarderia({
      ...newGuarderia,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGuarderia(newGuarderia);
      onClose();
    } catch (error) {
      console.error("Error adding guardería:", error);
    }
  };

  return (
    <div className="agregar-guarderia">
      <h2>Agregar Guardería</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newGuarderia.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={newGuarderia.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Área"
          value={newGuarderia.area}
          onChange={handleChange}
          required
        />
        <select
          name="medication"
          value={newGuarderia.medication}
          onChange={handleChange}
        >
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="openSpace"
            checked={newGuarderia.openSpace}
            onChange={handleChange}
          />
          Espacio Abierto
        </label>
        <label>
          <input
            type="checkbox"
            name="walker"
            checked={newGuarderia.walker}
            onChange={handleChange}
          />
          Paseador
        </label>
        <input
          type="number"
          name="dueñoId"
          placeholder="ID del Dueño"
          value={newGuarderia.dueñoId}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

AgregarGuarderia.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AgregarGuarderia;
