import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";
import "./ReservarTurno.css";

const ReservarTurno = ({ onReserveSuccess }) => {
  const { guarderiaList, updateGuarderia } = useContext(AuthContext);
  const [selectedGuarderia, setSelectedGuarderia] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");

  const guarderiaOptions = guarderiaList.map((guarderia) => (
    <option key={guarderia.id} value={guarderia.id}>
      {guarderia.name && guarderia.name.name
        ? guarderia.name.name
        : "Guardería sin nombre"}
    </option>
  ));

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!selectedGuarderia) {
      alert("Por favor, selecciona una guardería.");
      return;
    }

    const selected = guarderiaList.find(
      (guarderia) => guarderia.id === parseInt(selectedGuarderia)
    );

    if (!selected) {
      alert("Guardería no encontrada.");
      return;
    }

    const updatedGuarderia = {
      ...selected,
      reservas: (selected.reservas || 0) + 1,
    };

    try {
      await updateGuarderia(updatedGuarderia);

      setSelectedGuarderia("");
      setEntryDate("");
      setExitDate("");
      alert("Reserva realizada con éxito.");
      if (onReserveSuccess) {
        console.log(
          "Llamando a onReserveSuccess con:",
          selected.name.name,
          entryDate,
          exitDate
        );
        onReserveSuccess(selected.name.name, entryDate, exitDate);
      }
    } catch (error) {
      console.error("Error al hacer la reserva:", error);
      alert("Hubo un error al hacer la reserva.");
    }
  };

  return (
    <div className="reserve-turn">
      <h2>Reservar Turno</h2>
      <form onSubmit={handleReserve}>
        <label htmlFor="guarderia">Selecciona una guardería:</label>
        <select
          id="guarderia"
          value={selectedGuarderia}
          onChange={(e) => setSelectedGuarderia(e.target.value)}
        >
          {guarderiaOptions}
        </select>

        <label htmlFor="entryDate">Fecha de entrada:</label>
        <input
          type="date"
          id="entryDate"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />

        <label htmlFor="exitDate">Fecha de salida:</label>
        <input
          type="date"
          id="exitDate"
          value={exitDate}
          onChange={(e) => setExitDate(e.target.value)}
        />

        <div className="actions">
          <button type="submit" className="btn-reserve">
            Reservar
          </button>
        </div>
      </form>
    </div>
  );
};

ReservarTurno.propTypes = {
  onReserveSuccess: PropTypes.func.isRequired,
};

export default ReservarTurno;
