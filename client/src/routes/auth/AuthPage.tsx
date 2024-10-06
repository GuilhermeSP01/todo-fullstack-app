import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function AuthPage() {

    const [form, setForm] = useState('login');

    const changeForm = (option: string) => {
        setForm(option);
    }

    return(
        <main className="flex h-screen w-screen">
            <div className="flex w-1/3 justify-center items-center bg-black">
                {form === 'login' && <LoginForm formOptions={changeForm} />}
                {form === 'register' && <RegisterForm formOptions={changeForm} />}
            </div>

            <div className="w-2/3 bg-slate-800">
            </div>
        </main>
    )
}