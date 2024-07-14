import PropTypes from "prop-types";
import "./CardCuadrada.css";

const CardCuadrada = ({ title, children, scrollable }) => {
  return (
    <div className="card-cuadrada">
      <h3>{title}</h3>
      <div className={scrollable ? "scrollable-table" : ""}>{children}</div>
    </div>
  );
};

CardCuadrada.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  scrollable: PropTypes.bool,
};

export default CardCuadrada;
