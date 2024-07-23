import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import PropTypes from "prop-types";
import "./AgregarUsuario.css";

const AgregarUsuario = ({ onClose }) => {
  const { addUser, userList } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    role: "cliente",
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(
      newUser.nombre,
      newUser.apellido,
      newUser.email,
      newUser.password,
      newUser.role
    );
    console.log("Lista de usuarios actualizada:", userList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newUser.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={newUser.apellido}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
        />
        <select name="role" value={newUser.role} onChange={handleChange}>
          <option value="cliente">Cliente</option>
          <option value="dueño">Dueño</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Agregar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

AgregarUsuario.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AgregarUsuario;
