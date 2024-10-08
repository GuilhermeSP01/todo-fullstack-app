import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    if(localStorage.getItem('token')) {
        axios.get('http://localhost:8080/hello', { headers: { Authorization: `${localStorage.getItem('token')}` } })
          .then( (response) => {
            response.status == 200 ? setValidated(true) : setValidated(false);
          } )
    }

    if(validated) {
        navigate('/');
    }

    const [form, setForm] = useState('login');

    const changeForm = (option: string) => {
        setForm(option);
    }

    return(
        <main className="flex h-screen w-screen">
            <div className="flex w-1/3 justify-center items-center bg-[hsl(224,71.43%,4.12%)]">
                {form === 'login' && <LoginForm formOptions={changeForm} />}
                {form === 'register' && <RegisterForm formOptions={changeForm} />}
            </div>

            <div className="w-2/3 bg-slate-800">
            </div>
        </main>
    )
}