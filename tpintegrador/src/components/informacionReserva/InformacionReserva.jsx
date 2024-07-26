import PropTypes from "prop-types";
import "./InformacionReserva.css";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";

const InformacionReserva = ({ guarderiaName, entryDate, exitDate }) => {

  const {theme} = useContext(ThemeContext)

  return (
    <div className={`informacion-reserva ${theme}`}>
      <h3>Reserva a la guarderia: {guarderiaName}</h3>
      <p>Fecha de entrada: {entryDate}</p>
      <p>Fecha de salida: {exitDate}</p>
    </div>
  );
};

InformacionReserva.propTypes = {
  guarderiaId: PropTypes.string.isRequired,
  entryDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
};

export default InformacionReserva;
