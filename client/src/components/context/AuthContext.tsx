import axios from "axios";
import { createContext, useContext, useState } from "react";
import { apiClient } from "./ApiClient";

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    email: string | null;
    token: string | null;
  }

export const AuthContext = createContext<AuthContextValue>({ 
    isAuthenticated: false, 
    login: async () => false, 
    logout: () => {}, 
    email: null, 
    token: null });
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    async function login(email: string, password: string) {

        try {

            const response = await axios.post('http://localhost:8080/auth/login', { email: email, password: password })

            if (response.status == 200) {
                setIsAuthenticated(true);
                setEmail(response.data.email);
                setToken(response.data.token);

                apiClient.interceptors.request.use( (config) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    return config;
                } );

                localStorage.setItem('token', `Bearer ${token}`)

                return true;
            } else {
                logout();
                return false;
            }

        } catch (error) {
            logout();
            return false;
        }

    }

    function logout() {
        setIsAuthenticated(false);
        setEmail(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, email, token }}>
            {children}
        </AuthContext.Provider>
    );

}