import Header from "../header/Header";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./InfoUser.css";
import CardCuadrada from "./CardCuadrada";

const InfoUser = () => {
  const { theme } = useContext(ThemeContext);
  const { loggedUser, setLoggedUser, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (loggedUser) {
      setEditUser({
        nombre: loggedUser.nombre,
        apellido: loggedUser.apellido,
        email: loggedUser.email,
      });
    }
  }, [loggedUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const updatedUser = { ...loggedUser, ...editUser };
      const updatedUserFromServer = await updateUser(updatedUser); // Actualizar en el contexto y servidor
      setLoggedUser(updatedUserFromServer);
      localStorage.setItem("loggedUser", JSON.stringify(updatedUserFromServer));
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const reservas = [
    { text: "Mi Reserva 1" },
    { text: "Mi Reserva 2" },
    { text: "Mi Reserva 3" },
    { text: "Mi Reserva 4" },
  ];

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <div className="content">
          <CardCuadrada title="Mis Reservas" scrollable={true}>
            <table>
              <tbody>
                {reservas.map((item, index) => (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td>
                      <button className="boton-borrar">Eliminar ❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardCuadrada>

          <CardCuadrada title="Mis Favoritos" scrollable={false}>
            <p>Lista con nombre de la guardería agregada a favoritos</p>
          </CardCuadrada>

          <CardCuadrada title="Mis Datos" scrollable={false}>
            <div className="user-details">
              <button className="boton-editar" onClick={handleEditClick}>
                Editar ✏️
              </button>
              {isEditing ? (
                <>
                  <p>
                    Nombre:{" "}
                    <input
                      type="text"
                      name="nombre"
                      value={editUser.nombre}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    Apellido:{" "}
                    <input
                      type="text"
                      name="apellido"
                      value={editUser.apellido}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    Email:{" "}
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleInputChange}
                    />
                  </p>
                  <button className="boton-guardar" onClick={handleSaveClick}>
                    Guardar ✔️
                  </button>
                </>
              ) : loggedUser ? (
                <>
                  <p>Nombre: {loggedUser.nombre}</p>
                  <p>Apellido: {loggedUser.apellido}</p>
                  <p>Email: {loggedUser.email}</p>
                </>
              ) : (
                <p>No se ha encontrado información del usuario.</p>
              )}
            </div>
          </CardCuadrada>
        </div>
      </div>
    </>
  );
};

export default InfoUser;
