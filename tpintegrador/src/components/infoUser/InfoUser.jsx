import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext"; // Importa AuthContext
import "./InfoUser.css";
import CardCuadrada from "./CardCuadrada";

const InfoUser = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext); // Obtén currentUser del contexto de autenticación

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Ejemplo de reservas
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
              <button className="boton-editar">Editar ✏️</button>
              {currentUser ? ( // Verifica si currentUser está definido
                <>
                  <p>Nombre: {currentUser.nombre}</p>
                  <p>Apellido: {currentUser.apellido}</p>
                  <p>Email: {currentUser.email}</p>
                  <p>Dirección: {currentUser.direccion}</p>
                  <p>Num. Tel: {currentUser.numTelefono}</p>
                  {/* Aquí puedes mostrar las mascotas del usuario si tienes esa información */}
                  <h4>Mis Mascotas</h4>
                  <div className="pet-info">
                    <div className="pet-photo">Foto</div>
                    <p>Descripción de la mascota</p>
                  </div>
                  <div className="pet-info">
                    <div className="pet-photo">Foto</div>
                    <p>Descripción de la mascota</p>
                  </div>
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
