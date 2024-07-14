import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/Context";
import "./InfoUser.css";
import CardCuadrada from "./CardCuadrada";

const InfoUser = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
              <p>Nombre: diego</p>
              <p>Apellido: maradona</p>
              <p>Email: eldiego@gmail.com</p>
              <p>Dirección: Sarmiento 2456</p>
              <p>Num. Tel: 123456789</p>
              <h4>Mis Mascotas</h4>
              <div className="pet-info">
                <div className="pet-photo">Foto</div>
                <p>Descripción de la mascota</p>
              </div>
              <div className="pet-info">
                <div className="pet-photo">Foto</div>
                <p>Descripción de la mascota</p>
              </div>
            </div>
          </CardCuadrada>
        </div>
      </div>
    </>
  );
};

export default InfoUser;
