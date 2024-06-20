import "./UserHome.css";
import HeaderHome from "../headerHome/HeaderHome";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const images = ["src/img/goldenChiquito.jpg", "src/img/perros.png"];

const UserHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <HeaderHome />
      <body className={`body ${theme}`}>
        <div className="dynamic-image">
          {" "}
          <img src={images[currentImageIndex]} alt="Dynamic" />
        </div>
        <div className="info-section">
          <div className="review-rating">
            <h2>Valoración</h2>
            <p>Reseña de la guardería</p>
          </div>
          <div className="actions">
            <button className={`btn-reserve ${theme}`}>Reservar turno</button>
            <button className={`btn-info ${theme}`}>Información</button>
          </div>
        </div>
      </body>
    </>
  );
};

export default UserHome;
