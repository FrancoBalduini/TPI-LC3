import { useState } from "react";
import "./HomePage.css";
import HeaderHome from "../headerHome/HeaderHome";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";
import { availableDates } from "../../../fake-api-nodejs/database.json";
import { AuthContext } from "../context/AuthenticationContext";
import { useCallback } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    entryDate: "",
    exitDate: "",
    area: "",
    medication: "No",
    openSpace: false,
    walker: false,
  });

  const [filteredGuarderias, setFilteredGuarderias] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { guarderiaList } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterGuarderias();
  };

  const filterGuarderias = useCallback(() => {
    console.log("FormData:", formData); // Debugging: Check formData values
    console.log("Guarderias List:", guarderiaList); // Debugging: Check guarderiaList values
  
    const {
      entryDate,
      exitDate,
      area,
      medication,
      openSpace,
      walker,
    } = formData;
  
    const filtered = guarderiaList.filter((guarderia) => {

      const availableFrom = new Date(guarderia.availableFrom);
      const availableTo = new Date(guarderia.availableTo);
      const selectedEntryDate = entryDate ? new Date(entryDate) : null;
      const selectedExitDate = exitDate ? new Date(exitDate) : null;
      
      const matchesDateRange = entryDate && exitDate
        ? (selectedEntryDate <= availableTo && selectedExitDate >= availableFrom)
        : true;
      
      const matchesArea = area ? guarderia.area === area : true;
      const matchesMedication = medication ? guarderia.medication === medication : true;
      const matchesOpenSpace = openSpace ? guarderia.openSpace === openSpace : true;
      const matchesWalker = walker ? guarderia.walker === walker : true;
  
      return (
        matchesDateRange &&
        matchesArea &&
        matchesMedication &&
        matchesOpenSpace &&
        matchesWalker
      );
    });
  
    console.log("Filtered Guarderias:", filtered); 
    setFilteredGuarderias(filtered);
  }, [formData, guarderiaList]);
  

  return (
    <>
      <HeaderHome
        searchValue={formData.search}
        onSearchChange={(e) =>
          setFormData({ ...formData, search: e.target.value })
        }
      />
      <body className={`body ${theme}`}>
        <img
          src="src\img\goldenChiquito.jpg"
          className="golden-chiquito"
          alt="Golden Chiquito"
        ></img>
        <div className={`reservation ${theme}`}>
          <h2>
            <em>Donde tus mascotas se sientan como en casa</em>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="divForm">
              <label className="labelTipoMascota">
                Busco guardería para mi:
              </label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                className="select-home"
              >
                <option disabled value="">
                  Mascota
                </option>
                <option value="Perro/a">Perro/a</option>
                <option value="Gato/a">Gato/a</option>
              </select>
            </div>
            <div>
              <label>Para los siguientes días:</label>
              <input
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                min={availableDates[0]}
                max={availableDates[availableDates.length - 1]}
              />
              <input
                type="date"
                name="exitDate"
                value={formData.exitDate}
                onChange={handleChange}
                min={formData.entryDate || availableDates[0]}
                max={availableDates[availableDates.length - 1]}
              />
            </div>
            <div>
              <label>Seleccion Zona cercana:</label>
              <select name="area" value={formData.area} onChange={handleChange}>
                <option value="">Zona</option>
                <option value="norte">Zona Norte</option>
                <option value="sur">Zona Sur</option>
                <option value="este">Zona Este</option>
                <option value="oeste">Zona Oeste</option>
                <option value="centro">Zona Centro</option>
              </select>
            </div>
            <div>
              <label>¿Necesita medicamento?</label>
              <input
                type="radio"
                name="needsMedication"
                value="Si"
                checked={formData.needsMedication === "Si"}
                onChange={handleChange}
              />{" "}
              Si
              <input
                type="radio"
                name="needsMedication"
                value="No"
                checked={formData.needsMedication === "No"}
                onChange={handleChange}
              />{" "}
              No
            </div>
            <div className="checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="openSpace"
                  checked={formData.openSpace}
                  onChange={handleChange}
                />{" "}
                Espacio Abierto
              </label>
              <label>
                <input
                  type="checkbox"
                  name="walker"
                  checked={formData.walker}
                  onChange={handleChange}
                />{" "}
                Paseador
              </label>
            </div>
            <button type="button" onClick={filterGuarderias} className={`botonBuscar ${theme}`}>
              Buscar
            </button>
          </form>
          <div className="filtered-results">
            {filteredGuarderias.length > 0 ? (
              <ul>
                {filteredGuarderias.map((guarderia) => (
                  <li key={guarderia.id}>{guarderia.name}</li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron guarderías que coincidan con los criterios.</p>
            )}
          </div>
        </div>
      </body>
    </>
  );
};

export default HomePage;
