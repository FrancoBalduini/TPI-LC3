import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState([]);

  const registerUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
        setCurrentUser(user);
        return user;
      } else {
        const user = userList.find((user) => user.email === email && user.password === password);
        if (user) {
          setCurrentUser(user);
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

  return (
    <AuthContext.Provider value={{ currentUser, userList, registerUser, loginUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;