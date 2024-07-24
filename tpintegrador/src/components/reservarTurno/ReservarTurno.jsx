import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";

const ReservarTurno = ({ guarderiaOptions }) => {
  const { loggedUser, createReservation } = useContext(AuthContext);
  const [selectedGuarderia, setSelectedGuarderia] = useState(
    guarderiaOptions[0]?.id || null
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!loggedUser) {
      setError("Debes iniciar sesión para hacer una reserva.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Debes seleccionar las fechas de entrada y salida.");
      return;
    }

    try {
      await createReservation(
        selectedGuarderia,
        loggedUser.id,
        startDate,
        endDate
      );
      alert("Reserva creada exitosamente!");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleReserve}>
        <div>
          <label htmlFor="guarderia">Selecciona una guardería:</label>
          <select
            id="guarderia"
            value={selectedGuarderia}
            onChange={(e) => setSelectedGuarderia(parseInt(e.target.value, 10))}
          >
            {guarderiaOptions.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="startDate">Fecha de entrada:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="endDate">Fecha de salida:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button type="submit">Reservar turno</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

ReservarTurno.propTypes = {
  guarderiaOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReservarTurno;
