import axios from "axios";
import { createContext, useContext, useState } from "react";
import { apiClient } from "./ApiClient";

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    username: string | null;
    token: string | null;
  }

export const AuthContext = createContext<AuthContextValue>({ 
    isAuthenticated: false, 
    login: async () => false, 
    logout: () => {}, 
    username: null, 
    token: null });
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    async function login(email: string, password: string) {

        try {

            const response = await axios.post('http://localhost:8080/auth/login', { email: email, password: password })

            if (response.status == 200) {
                const userDetails = await axios.get('http://localhost:8080/api/users/' + email, { headers: { Authorization: `Bearer ${response.data.token}` } });
                setIsAuthenticated(true);
                setUsername(userDetails.data.username);
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
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    );

}