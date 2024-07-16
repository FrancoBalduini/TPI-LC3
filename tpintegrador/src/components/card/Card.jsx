import "./Card.css";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";

const Card = ({
  title,
  placeholder,
  children,
  typeTitle,
  searchTerm,
  onSearchChange,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`card ${theme}`}>
      <h3>{typeTitle}</h3>
      <input
        type="search"
        className="input-busqueda-usuario"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
      />
      <h2>{title}</h2>
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  typeTitle: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Card;
