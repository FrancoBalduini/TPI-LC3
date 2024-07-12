import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/Context";
import "./DuenoGuarderia.css";
import CardCuadrada from "../cardCuadrada/CardCuadrada";
import CardGuarderia from "../cardGuarderia/CardGuarderia";

const DuenoGuarderia = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const turnos = [
    { text: "Turno 1" },
    { text: "Turno 2" },
    { text: "Turno 3" },
    { text: "Turno 4" },
  ];
  return (
    <>
      <Header />
      <div className="content">
        <div>
          <CardCuadrada title="Turnos" items={turnos} />
          <CardCuadrada title="Agregar Guarderías" items={turnos} />
        </div>
        <CardGuarderia />
      </div>
    </>
  );
};

export default DuenoGuarderia;
