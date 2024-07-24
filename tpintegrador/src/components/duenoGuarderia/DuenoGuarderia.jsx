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

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  console.log('lista de reservas dueño', reservasList)
  console.log('lista de guarderias dueño', guarderiaList)

  const userGuarderias = guarderiaList.filter(
    (guarderia) => guarderia.dueñoId === loggedUser.id
  );

  const dueñoReserva = reservasList.filter(
    (reserva) => reserva.dueñoId === loggedUser.id
  );

  console.log('dueño reserva', dueñoReserva)
  
  return (
    <div className={`bodyDuenoG ${theme}`}>
      <HeaderHome />
      <div className="content">
        <div>
          <CardCuadrada title="Turnos" items={(dueñoReserva)} />
          <CardCuadrada title="Agregar Guarderías" />
        </div>
      </div>
      <div className="guarderia-container">
        <CardGuarderia guarderiaList={userGuarderias} />
      </div>
    </div>
  );
};

export default DuenoGuarderia;
