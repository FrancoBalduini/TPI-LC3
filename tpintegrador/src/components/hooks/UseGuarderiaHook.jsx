import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";

const useGuarderiaHook = () => {
  const { updateGuarderia, deleteGuarderia, guarderiaList } =
    useContext(AuthContext);
  const [editingGuarderia, setEditingGuarderia] = useState(null);

  const handleEditGuarderia = (guarderia) => {
    setEditingGuarderia({ ...guarderia });
  };

  const handleSaveGuarderiaChanges = async () => {
    if (!editingGuarderia) return;
    await updateGuarderia(editingGuarderia);
    setEditingGuarderia(null);
  };

  const handleCancelEditGuarderia = () => {
    setEditingGuarderia(null);
  };

  const handleDeleteGuarderia = async (guarderiaId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de eliminar esta guardería?"
    );
    if (!confirmed) return;
    await deleteGuarderia(guarderiaId);
    if (editingGuarderia && editingGuarderia.id === guarderiaId) {
      setEditingGuarderia(null);
    }
  };

  return {
    editingGuarderia,
    guarderiaList,
    handleEditGuarderia,
    handleSaveGuarderiaChanges,
    handleCancelEditGuarderia,
    handleDeleteGuarderia,
  };
};

export default useGuarderiaHook;
