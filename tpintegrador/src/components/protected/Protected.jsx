import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRoles }) => {
  const { loggedUser } = useContext(AuthContext);

  if (!loggedUser || !allowedRoles.includes(loggedUser.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
