import { useState, useEffect, useContext } from "react";
import HeaderHome from "../headerHome/HeaderHome";
import { ThemeContext } from "../context/Context";
import ReservarTurno from "../reservarTurno/ReservarTurno";
import { AuthContext } from "../context/AuthenticationContext";
import "./UserHome.css";

const images = ["src/img/goldenChiquito.jpg", "src/img/perros.png"];

const UserHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { guarderiaList } = useContext(AuthContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleReservation = () => setShowReservation((prev) => !prev);

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
              onClick={toggleReservation}
            >
              Reservar turno
            </button>
            <button className={`btn-info ${theme}`}>Información</button>
          </div>
        </div>
        {showReservation && (
          <ReservarTurno
            guarderiaOptions={guarderiaList.map(({ id, name }) => ({
              id,
              name: name.name,
            }))}
          />
        )}
      </div>
    </>
  );
};

export default UserHome;
