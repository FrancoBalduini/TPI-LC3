import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [guarderiaList, setGuarderiaList] = useState([]);

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

  const registerUser = async (
    nombre,
    apellido,
    email,
    password,
    role = "cliente"
  ) => {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email, password, role }),
      });

      if (response.ok) {
        const user = await response.json();
        setUserList((prevUserList) => [...prevUserList, user]);
        return user;
      } else {
        throw new Error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      throw error;
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
      if (response.ok) {
        const updatedUserFromServer = await response.json();
        setUserList((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUserFromServer.id ? updatedUserFromServer : user
          )
        );
      } else {
        console.error("Error al actualizar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`User with id ${userId} deleted successfully`);
        setUserList((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
      } else {
        console.error("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        userList,
        registerUser,
        loginUser,
        updateUser,
        deleteUser,
        setLoggedUser,
        guarderiaList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
