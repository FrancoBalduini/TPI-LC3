import PropTypes from "prop-types";
import "./InformacionReserva.css";

const InformacionReserva = ({ guarderiaName, entryDate, exitDate }) => {
  return (
    <div className="informacion-reserva">
      <h2>Información de la Reserva</h2>
      <p>
        <strong>Guardería:</strong> {guarderiaName}
      </p>
      <p>
        <strong>Fecha de entrada:</strong> {entryDate}
      </p>
      <p>
        <strong>Fecha de salida:</strong> {exitDate}
      </p>
    </div>
  );
};

InformacionReserva.propTypes = {
  guarderiaName: PropTypes.string.isRequired,
  entryDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
};

export default InformacionReserva;
