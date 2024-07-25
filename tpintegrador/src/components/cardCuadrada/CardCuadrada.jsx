import PropTypes from "prop-types";
import "./CardCuadrada.css";

const CardCuadrada = ({ title, reservas, onDelete }) => {
  return (
    <div className="card-cuadrada">
      <h2>{title}</h2>
      {reservas && reservas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Reserva ID</th>
              <th>Guardería ID</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.guarderiaId}</td>
                <td>{reserva.checkInDate}</td>
                <td>{reserva.checkOutDate}</td>
                <td>
                  <button onClick={() => onDelete(reserva.id)}>
                    Borrar Reserva
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes reservas.</p>
      )}
    </div>
  );
};

CardCuadrada.propTypes = {
  title: PropTypes.string.isRequired,
  reservas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      guarderiaId: PropTypes.string.isRequired,
      checkInDate: PropTypes.string.isRequired,
      checkOutDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardCuadrada;
