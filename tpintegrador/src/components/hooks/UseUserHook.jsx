import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";

const useUserHook = () => {
  const { updateUser, deleteUser, userList } = useContext(AuthContext);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveUserChanges = async () => {
    if (!editingUser) return;
    await updateUser(editingUser);
    setEditingUser(null);
  };

  const handleCancelEditUser = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmed) return;
    await deleteUser(userId);
    if (editingUser && editingUser.id === userId) {
      setEditingUser(null);
    }
  };

  return {
    editingUser,
    userList,
    handleEditUser,
    handleSaveUserChanges,
    handleCancelEditUser,
    handleDeleteUser,
  };
};

export default useUserHook;
