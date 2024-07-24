import PropTypes from "prop-types";

const InformacionReserva = ({ guarderiaName, entryDate, exitDate }) => {
  return (
    <div className="informacion-reserva">
      <h3>{guarderiaName}</h3>
      <p>Fecha de entrada: {entryDate}</p>
      <p>Fecha de salida: {exitDate}</p>
    </div>
  );
};

InformacionReserva.propTypes = {
  guarderiaName: PropTypes.string.isRequired,
  entryDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
};

export default InformacionReserva;
