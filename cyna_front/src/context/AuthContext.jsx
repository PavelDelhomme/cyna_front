import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token && !user) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Erreur lors du décodage du token:', err);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token, user]);

  const signIn = async (credentials) => {
    const data = await apiLogin(credentials);
    console.log('Données de connexion reçues:', data);
    console.log('Type de role:', typeof data.role);
    console.log('Valeur de role:', data.role);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data);
    return data;
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const getDashboardPath = () => {
    console.log('État actuel de l\'utilisateur:', user);
    console.log('Type de role dans getDashboardPath:', typeof user?.role);
    console.log('Valeur de role dans getDashboardPath:', user?.role);
    if (!user) return null;
    
    // Vérifier si le rôle est dans un objet avec une propriété name
    const roleName = user.role?.name || user.role;
    const path = roleName === 'admin' ? '/dashboard' : '/dashboardClient';
    console.log('Chemin du dashboard déterminé:', path);
    return path;
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, getDashboardPath }}>
      {children}
    </AuthContext.Provider>
  );
}