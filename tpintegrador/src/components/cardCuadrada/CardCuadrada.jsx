import PropTypes from "prop-types";
import "./CardCuadrada.css";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";

const CardCuadrada = ({ title, items, scrollable }) => {
  const { theme } = useContext(ThemeContext);

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className={`card-square ${theme}`}>
      <h3>{title}</h3>
      <div className={scrollable ? "scrollable-table" : ""}>
        <table>
          <tbody>
            {safeItems.map((item, index) => (
              <tr key={index}>
                <td>{title === "Turnos" ? item.text : ""}</td>
                <td>
                  <button className="boton-agregar">Agregar ✅</button>
                </td>
                <td>
                  <button className="boton-borrar">Eliminar ❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CardCuadrada.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  scrollable: PropTypes.bool,
};

export default CardCuadrada;
