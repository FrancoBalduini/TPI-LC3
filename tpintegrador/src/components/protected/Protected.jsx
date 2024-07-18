import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";

const Protected = ({ allowedRoles }) => {
  const { loggedUser } = useContext(AuthContext);

  if (!loggedUser) return <Navigate to="/" replace />;

  if (!allowedRoles.includes(loggedUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

Protected.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Protected;
