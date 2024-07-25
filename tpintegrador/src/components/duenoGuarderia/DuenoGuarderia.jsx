import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./DuenoGuarderia.css";
import CardCuadrada from "../cardCuadrada/CardCuadrada";
import CardGuarderia from "../cardGuarderia/CardGuarderia";
import HeaderHome from "../headerHome/HeaderHome";
import { useNavigate } from "react-router-dom";

const DuenoGuarderia = () => {
  const { theme } = useContext(ThemeContext);
  const { reservasList, guarderiaList, loggedUser, deleteReservation,setLoggedUser,deleteUser } =
    useContext(AuthContext);

  console.log("reservasList:", reservasList);
  console.log("loggedUser:", loggedUser);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const guarderiasDueño = guarderiaList.filter(
    (guarderia) => guarderia.dueñoId === loggedUser.Id
  );

  const dueñoReservations = reservasList.filter(
    (reserva) => reserva.dueñoId === loggedUser.id
  );

  const handleDelete = (reservationId) => {
    deleteReservation(reservationId);
  };
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmed) {
      const deleted = await deleteUser(loggedUser.id);
      if (deleted) {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
        
      } else {
        console.error("Error al eliminar usuario");
      }
    }
    navigate("/");
  };


  return (
    <div className={`bodyDuenoG ${theme}`}>
      <HeaderHome />
      <div className="content">
        <div>
          <CardCuadrada
            title="Mis Reservas"
            reservas={dueñoReservations}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <div className="guarderia-container">
        <CardGuarderia guarderiaList={guarderiasDueño} />
      </div>

      <button
          className={`boton-eliminar-cliente zIndex5 ${theme}`}
          onClick={handleLogOut}
        >
          Eliminar usuario
        </button>

    </div>
  );
};

export default DuenoGuarderia;
