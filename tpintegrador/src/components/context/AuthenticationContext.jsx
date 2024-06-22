import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Estado para almacenar usuarios registrados
  const [currentUser, setCurrentUser] = useState(null); // Estado para almacenar el usuario actualmente loggeado

  const registerUser = (email, password) => {
    // Agregar un nuevo usuario a la lista de usuarios
    const newUser = { email, password };
    setUsers([...users, newUser]);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticationContextProvider;
