import { useState, useEffect, useContext } from "react";
import HeaderHome from "../headerHome/HeaderHome";
import { ThemeContext } from "../context/Context";
import ReservarTurno from "../reservarTurno/ReservarTurno";
import InformacionReserva from "../informacionReserva/InformacionReserva";
import { AuthContext } from "../context/AuthenticationContext";
import "./UserHome.css";

const UserHome = () => {
  const [currentGuarderiaIndex, setCurrentGuarderiaIndex] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { guarderiaList, reservasList, loggedUser } = useContext(AuthContext);

  useEffect(() => {
    if (guarderiaList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentGuarderiaIndex(
        (prevIndex) => (prevIndex + 1) % guarderiaList.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [guarderiaList]);

  const toggleReservation = () => setShowReservation((prev) => !prev);

  const toggleInfo = () => setShowInfo((prev) => !prev);

  const userReservations = reservasList.filter(
    (reserva) => reserva.userId === loggedUser.id
  );

  return (
    <>
      <HeaderHome />
      <body className={`body ${theme}`}>
        <div className="dynamic-info">
        {guarderiaList.length > 0 && (
            <div className="guarderia-info">
              <h2>
                Nombre Guarderia: {guarderiaList[currentGuarderiaIndex].name}
              </h2>
              <p>Dirección: {guarderiaList[currentGuarderiaIndex].address}</p>
              <p>Área: {guarderiaList[currentGuarderiaIndex].area}</p>
              <p>
                Medicación: {guarderiaList[currentGuarderiaIndex].medication}
              </p>
              <p>
                Espacio Abierto:{" "}
                {guarderiaList[currentGuarderiaIndex].openSpace ? "Sí" : "No"}
              </p>
              <p>
                Walkers:{" "}
                {guarderiaList[currentGuarderiaIndex].walker ? "Sí" : "No"}
              </p>
            </div>
          )}
        </div>

        <div className="actions">
          <button
            className={`btn-reserve ${theme}`}
            onClick={toggleReservation}
          >
            Reservar turno
          </button>
          <button className={`btn-info ${theme}`} onClick={toggleInfo}>
            Información
          </button>
        </div>
      </body>

      {showReservation && (
        <ReservarTurno
          guarderiaOptions={guarderiaList.map(({ id, name }) => ({
            id,
            name: name.name,
          }))}
        />
      )}

      {showInfo && (
        <div className={`reservations-info ${theme}`}>
          {userReservations.length > 0 ? (
            userReservations.map((reserva) => (
              <InformacionReserva
                key={reserva.id}
                guarderiaName={reserva.guarderiaName}
                entryDate={reserva.checkInDate}
                exitDate={reserva.checkOutDate}
              />
            ))
          ) : (
            <p>No tienes reservas.</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserHome;
