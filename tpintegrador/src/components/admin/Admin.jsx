import Header from "../header/Header";
import { ThemeContext } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import "./Admin.css";
import Card from "../card/Card";
import useGuarderiaHook from "../hooks/useGuarderiaHook";
import useUserHook from "../hooks/useUserHook";

import AgregarUsuario from "../agregarAdmin/AgregarUsuario";

const Admin = () => {
  const { theme } = useContext(ThemeContext);
  const {
    userList,
    editingUser,
    setEditingUser,
    handleEditUser,
    handleSaveUserChanges,
    handleCancelEditUser,
    handleDeleteUser,
  } = useUserHook();
  const {
    guarderiaList,
    editingGuarderia,
    setEditingGuarderia,
    handleEditGuarderia,
    handleSaveGuarderiaChanges,
    handleCancelEditGuarderia,
    handleDeleteGuarderia,
  } = useGuarderiaHook();

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [guarderiaSearchTerm, setGuarderiaSearchTerm] = useState("");
  const [showAgregarUsuario, setShowAgregarUsuario] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleUserSearchChange = (e) => {
    setUserSearchTerm(e.target.value);
  };

  const handleGuarderiaSearchChange = (e) => {
    setGuarderiaSearchTerm(e.target.value);
  };

  const filteredUsers = userList.filter(
    (user) =>
      user.role !== "admin" &&
      (user.nombre.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.apellido.toLowerCase().includes(userSearchTerm.toLowerCase()))
  );

  const filteredGuarderias = guarderiaList.filter(
    (guarderia) =>
      guarderia.name &&
      typeof guarderia.name === "string" &&
      guarderia.name.toLowerCase().includes(guarderiaSearchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className={`lupa-input ${theme}`}>
        {/* Add your search input fields here */}
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
                        <button onClick={handleCancelEditUser}>Cancelar</button>
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
            <button onClick={() => setShowAgregarUsuario(true)}>
              Agregar usuario ✅
            </button>
          </div>
          {showAgregarUsuario && (
            <AgregarUsuario onClose={() => setShowAgregarUsuario(false)} />
          )}
        </Card>
        <Card
          title="Lista de Guarderías Registradas"
          placeholder="Buscar guarderías"
          typeTitle="Guarderías"
          searchTerm={guarderiaSearchTerm}
          onSearchChange={handleGuarderiaSearchChange}
        >
          {filteredGuarderias.length > 0 ? (
            <div className="scrollable-list">
              <ul>
                {filteredGuarderias.map((guarderia) => (
                  <li key={guarderia.id}>
                    {editingGuarderia &&
                    editingGuarderia.id === guarderia.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingGuarderia.name}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editingGuarderia.address}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              address: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editingGuarderia.area}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              area: e.target.value,
                            })
                          }
                        />
                        <select
                          value={editingGuarderia.medication}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              medication: e.target.value,
                            })
                          }
                        >
                          <option value="Si">Sí</option>
                          <option value="No">No</option>
                        </select>
                        <label>
                          <input
                            type="checkbox"
                            checked={editingGuarderia.openSpace}
                            onChange={(e) =>
                              setEditingGuarderia({
                                ...editingGuarderia,
                                openSpace: e.target.checked,
                              })
                            }
                          />
                          Espacio Abierto
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={editingGuarderia.walker}
                            onChange={(e) =>
                              setEditingGuarderia({
                                ...editingGuarderia,
                                walker: e.target.checked,
                              })
                            }
                          />
                          Paseador
                        </label>
                        <button onClick={handleSaveGuarderiaChanges}>
                          Guardar
                        </button>
                        <button onClick={handleCancelEditGuarderia}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <>
                        {guarderia.name} - {guarderia.address} -{" "}
                        {guarderia.area}
                        <br />
                        Espacio Abierto: {guarderia.openSpace ? "Sí" : "No"}
                        <br />
                        Paseador: {guarderia.walker ? "Sí" : "No"}
                        <div className="button-container">
                          <button
                            onClick={() => handleEditGuarderia(guarderia)}
                          >
                            Editar ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteGuarderia(guarderia.id)}
                          >
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
            <p>No hay guarderías registradas.</p>
          )}
        </Card>
      </div>
    </>
  );
};

export default Admin;
