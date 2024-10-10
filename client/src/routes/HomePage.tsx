import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const authContext = useAuth();
    const navigate = useNavigate();

    function printAuthContext() {
        console.log(authContext.isAuthenticated, authContext.username, authContext.email, authContext.token);
        console.log(localStorage.getItem('token'));
    }

    function logout() {
        authContext.logout();
        navigate('/auth');
    }
    
    return(
        <div>
            <h1> Home Page </h1>
            <Button onClick={printAuthContext}> authContext </Button> <br />
            <Button onClick={logout}> Logout </Button>
        </div>
    )
}