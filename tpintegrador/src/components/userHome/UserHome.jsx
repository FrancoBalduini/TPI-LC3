import "./UserHome.css";
import HeaderHome from "../headerHome/HeaderHome";
import { ThemeContext } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import ReservarTurno from "../reservarTurno/ReservarTurno";
import InformacionReserva from "../informacionReserva/InformacionReserva";

const images = ["src/img/goldenChiquito.jpg", "src/img/perros.png"];

const UserHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useContext(ThemeContext);
  const [showReserveTurn, setShowReserveTurn] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleReserveSuccess = (newReservation) => {
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);
    setShowReserveTurn(false);
  };

  useEffect(() => {
    console.log("Información de reserva actual:", reservations);
  }, [reservations]);

  return (
    <>
      <HeaderHome />
      <div className={`body ${theme}`}>
        <div className="dynamic-image">
          <img src={images[currentImageIndex]} alt="Dynamic" />
        </div>
        <div className="info-section">
          <div className="review-rating">
            <h2>Valoración</h2>
            <p>Reseña de la guardería</p>
          </div>
          <div className="actions">
            <button
              className={`btn-reserve ${theme}`}
              onClick={() => setShowReserveTurn(true)}
            >
              Reservar turno
            </button>
            <button className={`btn-info ${theme}`}>Información</button>
          </div>
        </div>
        {showReserveTurn && (
          <ReservarTurno onReserveSuccess={handleReserveSuccess} />
        )}
        {reservations.length > 0 && (
          <div className="reservations-container">
            {reservations.map((reservation, index) => (
              <InformacionReserva
                key={index}
                guarderiaName={reservation.guarderiaName}
                entryDate={reservation.entryDate}
                exitDate={reservation.exitDate}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserHome;
