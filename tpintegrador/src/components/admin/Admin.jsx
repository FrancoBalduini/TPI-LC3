import Header from "../header/Header";
import { AuthContext } from "../context/AuthenticationContext";
import { ThemeContext } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import "./Admin.css";
import Card from "../card/Card";

const Admin = () => {
  const { theme } = useContext(ThemeContext);
  const { userList, guarderiaList, setUserList } = useContext(AuthContext);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [guarderiaSearchTerm, setGuarderiaSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleUserSearchChange = (e) => {
    setUserSearchTerm(e.target.value);
  };

  const handleGuarderiaSearchChange = (e) => {
    setGuarderiaSearchTerm(e.target.value);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveUserChanges = () => {
    if (!editingUser) return;

    const updatedUserList = userList.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );

    setUserList(updatedUserList);
    localStorage.setItem("userList", JSON.stringify(updatedUserList));
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmed) return;

    const updatedUserList = userList.filter((user) => user.id !== userId);
    setUserList(updatedUserList);
    localStorage.setItem("userList", JSON.stringify(updatedUserList));

    if (editingUser && editingUser.id === userId) {
      setEditingUser(null);
    }
  };

  const filteredUsers = userList.filter(
    (user) =>
      user.role !== "admin" &&
      (user.nombre.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.apellido.toLowerCase().includes(userSearchTerm.toLowerCase()))
  );

  const filteredGuarderias = guarderiaList.filter((guarderia) =>
    guarderia.name.toLowerCase().includes(guarderiaSearchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className={`lupa-input ${theme}`}>
        <span>Admin</span> {}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search zIndex5"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`bells-icon ${theme}`}
          >
            <path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`user-icon ${theme}`}
          >
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
          </svg>
        </div>
      </div>
      <div className={`cuerpo ${theme}`}>
        <Card
          title="Lista de Usuarios Registrados"
          className="card1"
          placeholder="Buscar usuarios"
          typeTitle="Usuarios"
          searchTerm={userSearchTerm}
          onSearchChange={handleUserSearchChange}
        >
          {filteredUsers.length > 0 ? (
            <div className="scrollable-list">
              <ul>
                {filteredUsers.map((user) => (
                  <li key={user.id}>
                    {editingUser && editingUser.id === user.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingUser.nombre}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              nombre: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editingUser.apellido}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              apellido: e.target.value,
                            })
                          }
                        />
                        <select
                          value={editingUser.role}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              role: e.target.value,
                            })
                          }
                        >
                          <option value="cliente">Cliente</option>
                          <option value="dueño">Dueño</option>
                        </select>
                        <button onClick={handleSaveUserChanges}>Guardar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                      </div>
                    ) : (
                      <>
                        {user.nombre} {user.apellido} - {user.role}
                        <div className="button-container">
                          <button onClick={() => handleEditUser(user)}>
                            Editar ✏️
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)}>
                            Eliminar ❌
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay usuarios registrados.</p>
          )}
          <div className="button-container">
            <button>Agregar usuario ✅</button>
          </div>
        </Card>
        <Card
          title="Lista de Guarderías Registradas"
          placeholder="Buscar guarderias"
          typeTitle="Guarderias"
          searchTerm={guarderiaSearchTerm}
          onSearchChange={handleGuarderiaSearchChange}
        >
          {filteredGuarderias.length > 0 ? (
            <div className="scrollable-list">
              <ul>
                {filteredGuarderias.map((guarderia) => (
                  <li key={guarderia.id}>
                    {guarderia.name} - {guarderia.address}
                    <div className="button-container">
                      <button>Editar ✏️</button>
                      <button>Eliminar ❌</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay guarderías registradas.</p>
          )}
          <div className="button-container">
            <a href="#">
              <button>Agregar guarderia ✅</button>
            </a>{" "}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Admin;
