import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";

const useUserManagement = () => {
  const {
    updateUser,
    deleteUser,
    userList,

    setLoggedUser,
    loggedUser,
  } = useContext(AuthContext);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveUserChanges = async () => {
    try {
      const updatedUser = { ...loggedUser, ...editingUser };
      const updatedUserFromServer = await updateUser(updatedUser);
      setLoggedUser(updatedUserFromServer);
      localStorage.setItem("loggedUser", JSON.stringify(updatedUserFromServer));
      setEditingUser(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleCancelEditUser = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
  };

  return {
    userList,
    editingUser,
    setEditingUser,
    handleEditUser,
    handleSaveUserChanges,
    handleCancelEditUser,
    handleDeleteUser,
  };
};

export default useUserManagement;
