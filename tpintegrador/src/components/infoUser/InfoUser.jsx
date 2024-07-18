import Header from "../header/Header";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./InfoUser.css";
import CardCuadrada from "./CardCuadrada";

const InfoUser = () => {
  const { theme } = useContext(ThemeContext);
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  const [localLoggedUser, setLocalLoggedUser] = useState(null);
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
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLocalLoggedUser(parsedUser);
      setLoggedUser(parsedUser);
      setEditUser({
        nombre: parsedUser.nombre,
        apellido: parsedUser.apellido,
        email: parsedUser.email,
      });
    }
  }, [setLoggedUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    const updatedUser = { ...localLoggedUser, ...editUser };
    setLocalLoggedUser(updatedUser);
    setLoggedUser(updatedUser);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const reservas = [
    { text: "Mi Reserva 1" },
    { text: "Mi Reserva 2" },
    { text: "Mi Reserva 3" },
    { text: "Mi Reserva 4" },
  ];

  const userToShow = localLoggedUser || loggedUser;

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
              ) : userToShow ? (
                <>
                  <p>Nombre: {userToShow.nombre}</p>
                  <p>Apellido: {userToShow.apellido}</p>
                  <p>Email: {userToShow.email}</p>
                  {/* Agregar más campos si están disponibles en loggedUser */}
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
