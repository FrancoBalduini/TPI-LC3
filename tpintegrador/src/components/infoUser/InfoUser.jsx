import Header from "../header/Header";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./InfoUser.css";
import CardCuadrada from "./CardCuadrada";
import { useNavigate } from "react-router-dom";

const InfoUser = () => {
  const { theme } = useContext(ThemeContext);
  const {
    loggedUser,
    setLoggedUser,
    updateUser,
    reservasList,
    deleteReservation,
  } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const userReservations = reservasList.filter(
    (reserva) => reserva.userId === loggedUser.id
  );

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
      const updatedUser = {
        ...loggedUser,
        nombre: editUser.nombre,
        apellido: editUser.apellido,
        email: editUser.email,
        ...(editUser.password && { password: editUser.password }),
      };

      const updatedUserFromServer = await updateUser(updatedUser);
      setLoggedUser(updatedUserFromServer);
      localStorage.setItem("loggedUser", JSON.stringify(updatedUserFromServer));
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/userHome");
  };

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <div className="content">
          <CardCuadrada title="Mis Reservas" scrollable={true}>
            <table>
              <tbody>
                {userReservations && userReservations.length > 0 ? (
                  userReservations.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>
                        Guardería: {reserva.guarderiaId} <br />
                        Fecha Entrada: {reserva.checkInDate} <br />
                        Fecha Salida: {reserva.checkOutDate}
                      </td>
                      <td>
                        <button
                          className="boton-borrar"
                          onClick={() => handleDeleteReservation(reserva.id)}
                        >
                          Eliminar ❌
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No tienes reservas.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
                  <p>
                    Contraseña:{" "}
                    <input
                      type="password"
                      name="password"
                      value={editUser.password}
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
        <button onClick={handleBack} className={`boton-volver ${theme}`}>
          Volver atras
        </button>
      </div>
    </>
  );
};

export default InfoUser;
