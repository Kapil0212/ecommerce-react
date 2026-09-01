import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem('idToken')
  );

  const login = (idToken) => {
    localStorage.setItem('idToken', idToken);
    setToken(idToken);
  };

  const logout = () => {
    localStorage.removeItem('idToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);