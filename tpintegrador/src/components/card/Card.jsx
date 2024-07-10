import "./Card.css";
import PropTypes from "prop-types";

const Card = ({ title, placeholder, children, typeTitle }) => {
  return (
    <div className="card">
      <h3>{typeTitle}</h3>
      <input
        type="search"
        className="input-busqueda-usuario"
        placeholder={placeholder}
      />
      <h2>{title}</h2>

      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  typeTitle: PropTypes.string.isRequired,
};
