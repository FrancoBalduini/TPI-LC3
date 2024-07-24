import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [guarderiaList, setGuarderiaList] = useState([]);

  // Funciones Fetch
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();
      setUserList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchGuarderias = async () => {
    try {
      const response = await fetch("http://localhost:8000/guarderias");
      if (!response.ok) throw new Error("Failed to fetch guarderias");
      const guarderias = await response.json();
      console.log("Datos de guarderías:", guarderias);
      setGuarderiaList(guarderias);
    } catch (error) {
      console.error("Error fetching guarderias:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGuarderias();
  }, []);

  // Funciones
  const registerUser = async (nombre, apellido, email, password, role) => {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email, password, role }),
      });
      if (!response.ok) throw new Error("Failed to register user");
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
        const { accessToken, ...user } = await response.json();
        setLoggedUser(user);
        localStorage.setItem("authToken", accessToken);
        return user;
      } else {
        const user = userList.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          setLoggedUser(user);
          localStorage.setItem("authToken", "");
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
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8000/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating user: ${errorText}`);
      }

      const updatedUserFromServer = await response.json();
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUserFromServer.id ? updatedUserFromServer : user
        )
      );
      return updatedUserFromServer;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting user: ${errorText}`);
      }

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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating guardería: ${errorText}`);
      }

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
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8000/guarderias/${guarderiaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting guardería: ${errorText}`);
      }

      setGuarderiaList((prevGuarderias) =>
        prevGuarderias.filter((guarderia) => guarderia.id !== guarderiaId)
      );
    } catch (error) {
      console.error("Error deleting guarderia:", error);
    }
  };

  const registerGuarderia = async (
    name,
    address,
    area,
    medication,
    openSpace,
    walker,
    dueñoId
  ) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8000/guarderias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name,
          address,
          area,
          medication,
          openSpace,
          walker,
          dueñoId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error registering guardería: ${errorText}`);
      }

      const newGuarderia = await response.json();
      setGuarderiaList((prevGuarderias) => [...prevGuarderias, newGuarderia]);
    } catch (error) {
      console.error("Error registering guardería:", error);
      throw error;
    }
  };

  const createReservation = async (reservation) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(reservation),
      });

      const contentType = response.headers.get("Content-Type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return data;
        } else {
          const errorText = await response.text();
          console.error("Respuesta no JSON:", errorText);
          throw new Error("La respuesta del servidor no es JSON");
        }
      } else {
        const errorText = await response.text();
        console.error("Error al crear la reserva:", errorText);
        throw new Error(`Error al crear la reserva: ${errorText}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  };

  const addUser = async (nombre, apellido, email, password, role) => {
    await registerUser(nombre, apellido, email, password, role);
  };

  const logoutUser = () => {
    setLoggedUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        userList,
        guarderiaList,

        registerUser,
        loginUser,
        updateUser,
        deleteUser,
        registerGuarderia,
        updateGuarderia,
        deleteGuarderia,
        createReservation,
        logoutUser,
        setLoggedUser,
        addUser,
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
