import "./Guarderia.css";
import { useContext } from "react";
import { ThemeContext } from "../context/Context";
import HeaderHome from "../headerHome/HeaderHome";

const GuarderiaPage = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <HeaderHome />
      <body className={`body ${theme}`}>
      <div className={"container"}>
       
          <section className="turnos">
            <h2 className="text-border">Turnos</h2>
            <ul>
              <li className="text-border">
                Turno <a href="#"><button>Eliminar ✖️</button></a> <a href="#"><button>Modificar ✏️</button></a>
              </li>
              <li className="text-border">
                Turno <a href="#"><button>Eliminar ✖️</button></a> <a href="#"><button>Modificar ✏️</button></a>
              </li>
              <li className="text-border">
                Turno <a href="#"><button>Eliminar ✖️</button></a> <a href="#"><button>Modificar ✏️</button></a>
              </li>
              <li className="text-border">
                Turno <a href="#"><button>Eliminar ✖️</button></a> <a href="#"><button>Modificar ✏️</button></a>
              </li>
            </ul>
          </section>
          <section className="guarderia">
            <h2 className="text-border">Guarderia</h2>
            <ul>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#"><button>Modificar ✏️</button></a>
                </div>
              </li>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#"><button>Modificar ✏️</button></a>
                </div>
              </li>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#"><button>Modificar ✏️</button></a>
                </div>
              </li>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#"><button>Modificar ✏️</button></a>
                </div>
              </li>
            </ul>
          </section>
          <section className="agregar-guarderias">
            <h2 className="text-border">Agregar Guarderias</h2>
            <p className="text-border">Completa el siguiente formulario</p>
          </section>
      </div>
      </body>
    </>
  );
};

export default GuarderiaPage;
