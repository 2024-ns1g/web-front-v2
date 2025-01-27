import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [token, setToken] = useState<string>(() => {
    const token = localStorage.getItem(getKey('token'));
    return token || '';
  });

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem(getKey('token'), token);
    } else {
      localStorage.removeItem(getKey('token'));
    }
  }, [token]);

  const handleLogin = (token: string) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken('');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function getKey(key: string) {
  return `primary.${key}`;
}
