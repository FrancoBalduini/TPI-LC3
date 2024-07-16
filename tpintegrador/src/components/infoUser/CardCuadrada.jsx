import PropTypes from "prop-types";
import "./CardCuadrada.css";
import { useContext } from "react";
import { ThemeContext } from "../context/Context";

const CardCuadrada = ({ title, children, scrollable }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`card-cuadrada ${theme}`}>
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
