import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [guarderiaList, setGuarderiaList] = useState([]);

  // Fetch functions
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const users = await response.json();
      setUserList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchGuarderias = async () => {
    try {
      const response = await fetch("http://localhost:8000/guarderias");
      const guarderias = await response.json();
      setGuarderiaList(guarderias);
    } catch (error) {
      console.error("Error fetching guarderias:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGuarderias();
  }, []);

  // Auth functions
  const registerUser = async (nombre, apellido, email, password, role) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email, password, role }),
      });
      const newUser = await response.json();
      setUserList((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        setLoggedUser(user);
        localStorage.setItem("loggedUser", JSON.stringify(user));
        return user;
      } else {
        const user = userList.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          setLoggedUser(user);
          localStorage.setItem("loggedUser", JSON.stringify(user));
          return user;
        } else {
          throw new Error("Credenciales incorrectas");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const updatedUserFromServer = await response.json();
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUserFromServer.id ? updatedUserFromServer : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
      });
      setUserList((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateGuarderia = async (updatedGuarderia) => {
    try {
      const response = await fetch(
        `http://localhost:8000/guarderias/${updatedGuarderia.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGuarderia),
        }
      );
      const updatedGuarderiaFromServer = await response.json();
      setGuarderiaList((prevGuarderias) =>
        prevGuarderias.map((guarderia) =>
          guarderia.id === updatedGuarderiaFromServer.id
            ? updatedGuarderiaFromServer
            : guarderia
        )
      );
    } catch (error) {
      console.error("Error updating guarderia:", error);
    }
  };

  const deleteGuarderia = async (guarderiaId) => {
    try {
      await fetch(`http://localhost:8000/guarderias/${guarderiaId}`, {
        method: "DELETE",
      });
      setGuarderiaList((prevGuarderias) =>
        prevGuarderias.filter((guarderia) => guarderia.id !== guarderiaId)
      );
    } catch (error) {
      console.error("Error deleting guarderia:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        userList,
        setUserList,
        guarderiaList,
        setGuarderiaList,
        registerUser,
        updateUser,
        deleteUser,
        updateGuarderia,
        deleteGuarderia,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
