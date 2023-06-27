import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formProps } from "../components/FormContainer";

export type AuthData = {
  _id: string;
  fullName: string;
  userName: string;
  role: string;
  token: string;
};

type AuthContextProps = {
  authData: AuthData | null;
  login: (response: AuthData) => void;
  logout: () => void;
  getSession: () => AuthData | null;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextContainer = ({ children }: formProps) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("tokenDetails");
    if (storedUser) {
      const token: AuthData = JSON.parse(storedUser);
      const decodedToken: { exp: number } = jwtDecode(token.token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token has expired, navigate to login page with session expired error
        sessionStorage.removeItem("tokenDetails");
        navigate("/login", { state: { sessionExpired: true }, replace: true });
      } else {
        setAuthData(token);
      }
    }
  }, [navigate]);

  const login = (response: AuthData): void => {
    sessionStorage.setItem("tokenDetails", JSON.stringify(response));
    setAuthData(response);
  };

  const getSession = (): AuthData | null => {
    const storedUser = sessionStorage.getItem("tokenDetails");
    if (storedUser) {
      const token: AuthData = JSON.parse(storedUser);
      return token;
    }
    return null;
  };

  const logout = () => {
    setAuthData(null);
    sessionStorage.removeItem("tokenDetails");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, getSession }}>
      {children}
    </AuthContext.Provider>
  );
};
