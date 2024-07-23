import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";
import "./ReservarTurno.css";

const ReservarTurno = ({ onReserveSuccess }) => {
  const { guarderiaList, addReservation, loggedUser } = useContext(AuthContext);
  const [selectedGuarderia, setSelectedGuarderia] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");

  const guarderiaOptions = guarderiaList.map((guarderia) => {
    const guarderiaName =
      guarderia.name && guarderia.name.name
        ? guarderia.name.name
        : "Nombre no disponible";
    return (
      <option key={guarderia.id} value={guarderia.id}>
        {guarderiaName}
      </option>
    );
  });

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!selectedGuarderia) {
      alert("Por favor, selecciona una guardería.");
      return;
    }

    if (!entryDate || !exitDate) {
      alert("Por favor, completa todas las fechas.");
      return;
    }

    if (new Date(entryDate) >= new Date(exitDate)) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada.");
      return;
    }

    try {
      const newReservation = await addReservation(parseInt(selectedGuarderia), {
        entryDate,
        exitDate,
        clientId: loggedUser ? loggedUser.id : null,
      });

      setSelectedGuarderia("");
      setEntryDate("");
      setExitDate("");
      alert("Reserva realizada con éxito.");
      if (onReserveSuccess) {
        onReserveSuccess({
          entryDate,
          exitDate,
          guarderiaName: guarderiaList.find(
            (g) => g.id === parseInt(selectedGuarderia)
          ).name.name,
          reservationId: newReservation.id, // Asegúrate de manejar el ID de reserva aquí
        });
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
