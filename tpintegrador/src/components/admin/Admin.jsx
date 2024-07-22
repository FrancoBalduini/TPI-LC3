import Header from "../header/Header";
import { ThemeContext } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import "./Admin.css";
import Card from "../card/Card";
import useUserManagement from "../hooks/useUserHook";
import useGuarderiaManagement from "../hooks/useGuarderiaHook";

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
  } = useUserManagement();
  const {
    guarderiaList,
    editingGuarderia,
    setEditingGuarderia,
    handleEditGuarderia,
    handleSaveGuarderiaChanges,
    handleCancelEditGuarderia,
    handleDeleteGuarderia,
  } = useGuarderiaManagement();

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [guarderiaSearchTerm, setGuarderiaSearchTerm] = useState("");

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

  const filteredGuarderias = guarderiaList.filter((guarderia) => {
    const guarderiaName = guarderia?.name?.name?.toLowerCase() || "";
    return guarderiaName.includes(guarderiaSearchTerm.toLowerCase());
  });

  return (
    <>
      <Header />
      <div className={`lupa-input ${theme}`}>{/* ... */}</div>
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
            <button>Agregar usuario ✅</button>
          </div>
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
                          value={editingGuarderia.name?.name || ""}
                          value={editingGuarderia.name?.name || ""}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              name: {
                                ...editingGuarderia.name,
                                name: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editingGuarderia.name?.address || ""}
                          value={editingGuarderia.name?.address || ""}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              name: {
                                ...editingGuarderia.name,
                                address: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editingGuarderia.name?.area || ""}
                          value={editingGuarderia.name?.area || ""}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              name: {
                                ...editingGuarderia.name,
                                area: e.target.value,
                              },
                            })
                          }
                        />
                        <select
                          value={editingGuarderia.name?.medication || ""}
                          value={editingGuarderia.name?.medication || ""}
                          onChange={(e) =>
                            setEditingGuarderia({
                              ...editingGuarderia,
                              name: {
                                ...editingGuarderia.name,
                                medication: e.target.value,
                              },
                            })
                          }
                        >
                          <option value="Si">Sí</option>
                          <option value="Si">Sí</option>
                          <option value="No">No</option>
                        </select>
                        <label>
                          <input
                            type="checkbox"
                            checked={editingGuarderia.name?.openSpace || false}
                            onChange={(e) =>
                              setEditingGuarderia({
                                ...editingGuarderia,
                                name: {
                                  ...editingGuarderia.name,
                                  openSpace: e.target.checked,
                                },
                              })
                            }
                          />
                          Espacio Abierto
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={editingGuarderia.name?.walker || false}
                            onChange={(e) =>
                              setEditingGuarderia({
                                ...editingGuarderia,
                                name: {
                                  ...editingGuarderia.name,
                                  walker: e.target.checked,
                                },
                              })
                            }
                          />
                          Paseador
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={editingGuarderia.name?.openSpace || false}
                            onChange={(e) =>
                              setEditingGuarderia({
                                ...editingGuarderia,
                                name: {
                                  ...editingGuarderia.name,
                                  openSpace: e.target.checked,
                                },
                              })
                            }
                          />
                          Espacio Abierto
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={editingGuarderia.name?.walker || false}
                            onChange={(e) =>
                              setEditingGuarderia({
                                ...editingGuarderia,
                                name: {
                                  ...editingGuarderia.name,
                                  walker: e.target.checked,
                                },
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
                        {guarderia.name?.name || "Nombre no disponible"} -{" "}
                        {guarderia.name?.address || "Dirección no disponible"} -{" "}
                        {guarderia.name?.area || "Área no disponible"} -{" "}
                        {guarderia.name?.openSpace
                          ? "Posee espacio abierto"
                          : "No posee espacio abierto"}{" "}
                        -{" "}
                        {guarderia.name?.walker
                          ? "Posee paseador"
                          : "No posee paseador"}
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
          <div className="button-container">
            <button>Agregar guardería ✅</button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Admin;
