import PropTypes from "prop-types";
import "./InformacionReserva.css";

const InformacionReserva = ({ guarderiaId, entryDate, exitDate }) => {
  return (
    <div className="informacion-reserva">
      <h3>Reserva a la guarderia: {guarderiaId}</h3>
      <p>Fecha de entrada: {entryDate}</p>
      <p>Fecha de salida: {exitDate}</p>
    </div>
  );
};

InformacionReserva.propTypes = {
  guarderiaId: PropTypes.number.isRequired,
  entryDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
};

export default InformacionReserva;
