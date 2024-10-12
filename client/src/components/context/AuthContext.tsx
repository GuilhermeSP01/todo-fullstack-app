import axios from "axios";
import { createContext, useContext, useState } from "react";
import { apiClient } from "./ApiClient";

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (username: string, email:string, password: string) => Promise<boolean>;
    logout: () => void;
    username: string | null;
    userId: string | null;
    email: string | null;
    token: string | null;
  }

export const AuthContext = createContext<AuthContextValue>({ 
    isAuthenticated: false, 
    login: async () => false, 
    register: async () => false,
    logout: () => {}, 
    username: null,
    userId: null,
    email: null,
    token: null });
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    async function register(username: string, email:string, password: string) {

        const response = await axios.post('http://localhost:8080/auth/register', { name: username, email: email, password: password })

        if (response.status == 201) {
            return login(email, password);
        } else {
            return false;
        }
    }

    async function login(email: string, password: string) {

        try {

            const response = await axios.post('http://localhost:8080/auth/login', { email: email, password: password })
            const userDetails = await axios.get('http://localhost:8080/api/users/' + email, { headers: { Authorization: `Bearer ${response.data.token}` } });

            if (response.status == 200 && userDetails.status == 200) {
                setIsAuthenticated(true);
                setUsername(userDetails.data.username);
                setEmail(userDetails.data.email);
                setToken(response.data.token);
                setUserId(userDetails.data.id);
                localStorage.setItem('userId', userDetails.data.id)
                localStorage.setItem('token', `Bearer ${response.data.token}`)
                localStorage.setItem('username', userDetails.data.username)
                localStorage.setItem('email', userDetails.data.email)

                apiClient.interceptors.request.use( (config) => {
                    config.headers.Authorization = `Bearer ${response.data.token}`;
                    return config;
                } );

                // const helloResponse = await axios.get('http://localhost:8080/hello', { headers: { Authorization: localStorage.getItem('token') } });
                // console.log(helloResponse.data)

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
        setUserId(null);
        setEmail(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, username, userId, email, token  }}>
            {children}
        </AuthContext.Provider>
    );

}