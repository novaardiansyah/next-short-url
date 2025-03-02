'use client';

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null as any,  
  login: (userData: any) => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleLogout = () => {
      // ! Global logout triggered!
      logout()
    };

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  const login = (userData: any) => {
    localStorage.setItem("users", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('users');
    localStorage.removeItem('access_token')
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}