import { ErrorMessage, Formik, useField, Form } from "formik";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from 'yup';
import { useAuth } from "@/components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, ...props }: 
    { label: string; name: string; [key: string]: any }) => {

    const [field] = useField(props);

    return(
        <div className="mb-4">
            <Label htmlFor={props.name} className="text-white text-lg"> {label} </Label>
            <Input {...field} {...props} className="text-slate-400" />
            <ErrorMessage name={props.name} component="div" className="text-red-400 text-sm" />
        </div>
    )
}

interface LoginFormProps {
    formOptions: (option: string) => void;
}

export default function LoginForm({ formOptions }: LoginFormProps) {

    const [isSubmitting, setSubmitting] = useState(false);
    const authContext = useAuth();
    const navigate = useNavigate();

    async function register(username: string, email:string, password: string) {

        setSubmitting(true);

        if(await authContext.register(username, email, password)) {
            navigate('/');
        }
        
        setSubmitting(false);
        
    }

    return(
        <Formik initialValues={{ username: '', email: '', password: '', passwordConfirm: '' }} 
        validationSchema={Yup.object({
            username: Yup.string()
                .min(4, 'Deve conter no mínimo 4 caracteres')
                .max(15, 'Deve conter no mínimo 15 caracteres')
                .matches(/^[a-zA-Z0-9._]+$/, 'Nome inválido')
                .required('* Preencha este campo'),
            email: Yup.string()
                .email('E-mail inválido')
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'E-mail inválido')
                .required('* Preencha este campo'),
            password: Yup.string()
                .min(6, 'Deve conter no mínimo 6 caracteres')
                .max(15, 'Deve conter no máximo 15 caracteres')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Deve conter letra maiúscula, minúscula, número e caractere especial')
                .required('* Preencha este campo'),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
                .required('* Preencha este campo')})} 
        onSubmit={ ({ username, email, password }) => register(username, email, password) }>
                
            <Form className="w-1/2">
                <div className="mb-4">
                    <h1 className="text-white text-4xl font-semibold"> Cadastro </h1>
                    <Label className="text-slate-400 text-base"> Entre ou cadastre-se para continuar </Label>
                </div>

                <div className="mb-6">
                    <InputField label="Nome" name="username" type="text" placeholder="usuario" />
                    <InputField label="E-mail" name="email" type="text" placeholder="exemplo@mail.com" />
                    <InputField label="Senha" name="password" type="password" placeholder="********" />
                    <InputField label="Confirme sua senha" name="passwordConfirm" type="password" placeholder="********" />
                </div>


                <div className="mb-8 flex justify-center gap-8">
                    <Button type="submit" className="w-2/5" disabled={isSubmitting}> Cadastrar </Button>
                    <Button type="button" variant="ghost" className="text-white w-2/5" disabled={isSubmitting} onClick={ () => formOptions('login') }> Já sou cadastrado </Button>
                </div>
            </Form>

        </Formik>
    )

}
