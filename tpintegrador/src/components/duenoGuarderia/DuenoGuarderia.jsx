import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./DuenoGuarderia.css";
import CardCuadrada from "../cardCuadrada/CardCuadrada";
import CardGuarderia from "../cardGuarderia/CardGuarderia";
import HeaderHome from "../headerHome/HeaderHome";

const DuenoGuarderia = () => {
  const { theme } = useContext(ThemeContext);
  const {
    reservations = [],
    deleteReservation,
    guarderiaList = [],
  } = useContext(AuthContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleDeleteReservation = (reservationId) => {
    deleteReservation(reservationId);
  };

  const turnos = [
    { text: "Turno 1" },
    { text: "Turno 2" },
    { text: "Turno 3" },
    { text: "Turno 4" },
  ];

  return (
    <div className={`bodyDuenoG ${theme}`}>
      <HeaderHome />
      <div className="content">
        <div>
          <CardCuadrada title="Turnos" items={turnos} />
          <CardCuadrada title="Agregar Guarderías" items={turnos} />
        </div>
        <div className="guarderia-container">
          <CardGuarderia guarderiaList={guarderiaList} />
        </div>
        <div className="reservations">
          <h2>Reservas</h2>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation.id} className="reservation">
                <p>{reservation.details}</p>
                <button onClick={() => handleDeleteReservation(reservation.id)}>
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay reservas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuenoGuarderia;
