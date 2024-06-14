import React, { useState } from "react";
import "./HomePage.css";
import HeaderHome from "../headerHome/HeaderHome";

const HomePage = () => {
  const [formData, setFormData] = useState({
    search: "",
    petType: "",
    entryDate: "",
    exitDate: "",
    area: "",
    needsMedication: "No",
    openSpace: false,
    walker: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      <HeaderHome
        searchValue={formData.search}
        onSearchChange={(e) =>
          setFormData({ ...formData, search: e.target.value })
        }
      />
      <main>
        <div className="reservation">
          <h2>"Donde tus mascotas se sientan como en casa"</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Busco guardería para mi:</label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}>
                <option value="">Mascota</option>
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
              />
              <input
                type="date"
                name="exitDate"
                value={formData.exitDate}
                onChange={handleChange}
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
            <button type="submit">Buscar</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default HomePage;
