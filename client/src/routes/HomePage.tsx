import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button"

export default function HomePage() {

    const authContext = useAuth();

    function handleClick() {
        console.log(authContext.isAuthenticated, authContext.username, authContext.email, authContext.token);
        console.log(localStorage.getItem('token'));
    }

    return(
        <div>
            <h1> Home Page </h1>
            <Button onClick={handleClick}> authContext </Button>
        </div>
    )
}