import "./Guarderia.css";
import Header from "../header/Header";

const GuarderiaPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <main>
          <section className="turnos">
            <h2 className="text-border">Turnos</h2>
            <ul>
              <li className="text-border">
                Turno <a href="#">Eliminar ✖️</a> <a href="#">Modificar ✏️</a>
              </li>
              <li className="text-border">
                Turno <a href="#">Eliminar ✖️</a> <a href="#">Modificar ✏️</a>
              </li>
              <li className="text-border">
                Turno <a href="#">Eliminar ✖️</a> <a href="#">Modificar ✏️</a>
              </li>
              <li className="text-border">
                Turno <a href="#">Eliminar ✖️</a> <a href="#">Modificar ✏️</a>
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
                  <a href="#">Modificar ✏️</a>
                </div>
              </li>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#">Modificar ✏️</a>
                </div>
              </li>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#">Modificar ✏️</a>
                </div>
              </li>
              <li>
                <div className="foto">Foto</div>
                <div>
                  <p className="text-border">Descripción de la guarderia</p>
                  <a href="#">Modificar ✏️</a>
                </div>
              </li>
            </ul>
          </section>
          <section className="agregar-guarderias">
            <h2 className="text-border">Agregar Guarderias</h2>
            <p className="text-border">Completa el siguiente formulario</p>
          </section>
        </main>
      </div>
    </>
  );
};

export default GuarderiaPage;
