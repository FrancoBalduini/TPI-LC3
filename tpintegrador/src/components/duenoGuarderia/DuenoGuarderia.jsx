import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/Context";
import { AuthContext } from "../context/AuthenticationContext";
import "./DuenoGuarderia.css";
import CardCuadrada from "../cardCuadrada/CardCuadrada";
import CardGuarderia from "../cardGuarderia/CardGuarderia";
import HeaderHome from "../headerHome/HeaderHome";

const DuenoGuarderia = () => {
  const { theme } = useContext(ThemeContext);
  const { reservasList, guarderiaList, loggedUser } = useContext(AuthContext);

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

  return (
    <div className={`bodyDuenoG ${theme}`}>
      <HeaderHome />
      <div className="content">
        <div>
          <CardCuadrada title="Mis Reservas" reservas={dueñoReservations} />
        </div>
        <div className="guarderia-container">
          <CardGuarderia guarderiaList={guarderiasDueño} />
        </div>
      </div>
    </div>
  );
};

export default DuenoGuarderia;