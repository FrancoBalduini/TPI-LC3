import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import "./ReservarTurno.css";

const ReservarTurno = () => {
  const { guarderiaList, createReservation, loggedUser } =
    useContext(AuthContext);
  const [selectedGuarderiaId, setSelectedGuarderiaId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [error, setError] = useState("");

  const handleReservation = async () => {
    if (!selectedGuarderiaId || !checkInDate || !checkOutDate) {
      setError("Debes completar todos los campos.");
      return;
    }

    const reservation = {
      guarderiaId: selectedGuarderiaId,
      userId: loggedUser.id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    try {
      const result = await createReservation(reservation);
      console.log("Reserva creada con éxito:", result);
    } catch (err) {
      setError(`Error al realizar la reserva: ${err.message}`);
    }
  };

  return (
    <div className="reservar-turno">
      <h2>Reservar Turno</h2>
      {error && <p className="error">{error}</p>}
      <form>
        <label htmlFor="guarderia">Selecciona una guardería:</label>
        <select
          id="guarderia"
          value={selectedGuarderiaId}
          onChange={(e) => setSelectedGuarderiaId(e.target.value)}
        >
          <option value="">Seleccione una guardería</option>
          {guarderiaList.map((guarderia) => (
            <option key={guarderia.id} value={guarderia.id}>
              {guarderia.name}
            </option>
          ))}
        </select>

        <label htmlFor="check-in">Fecha de Entrada:</label>
        <input
          id="check-in"
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />

        <label htmlFor="check-out">Fecha de Salida:</label>
        <input
          id="check-out"
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />

        <div className="actions">
          <button
            type="button"
            className="btn-reserve"
            onClick={handleReservation}
          >
            Reservar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservarTurno;
