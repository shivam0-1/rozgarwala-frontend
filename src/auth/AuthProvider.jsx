import React, { useEffect, useState } from "react";
import { getToken, getRole, logout } from "../utils/authStorage";
import { getMyProfile } from "../api/profile.api";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setRole(null);
    setUser(null);
    setLoading(false);
  };

  // 🔥 NEW: sync auth immediately after login
  const login = async () => {
    const savedRole = getRole();

    setIsAuth(true);
    setRole(savedRole);
    setLoading(true);

    try {
      const profile = await getMyProfile();
      setUser(profile);
    } catch {
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  // 🔁 On page refresh
  useEffect(() => {
    const token = getToken();
    const savedRole = getRole();

    if (!token || !savedRole) {
      setLoading(false);
      return;
    }

    setIsAuth(true);
    setRole(savedRole);

    getMyProfile()
      .then((data) => setUser(data))
      .catch(handleLogout)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        role,
        user,
        loading,
        login,        // 👈 exposed
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
