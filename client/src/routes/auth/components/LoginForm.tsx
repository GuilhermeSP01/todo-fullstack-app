import { ErrorMessage, Formik, useField, Form } from "formik";
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from 'yup';

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

    return(
        <Formik initialValues={{ email: '', password: '' }} 
        validationSchema={Yup.object({
            email: Yup.string()
                .email('E-mail inválido')
                .required('* Preencha este campo')
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'E-mail inválido'),
            password: Yup.string()
                .min(8, 'Deve conter no mínimo 8 caracteres')
                .max(15, 'Deve conter no máximo 15 caracteres')
                .required('* Preencha este campo')})} 
        onSubmit={(values, actions) => { 
            console.log({ values, actions }); 
            alert(JSON.stringify(values, null, 2)); 
            actions.setSubmitting(false);}}>
                
            <Form className="w-1/2">
                    <div className="mb-4">
                        <h1 className="text-white text-4xl font-semibold"> Login </h1>
                        <Label className="text-slate-400 text-base"> Entre ou cadastre-se para continuar </Label>
                    </div>

                    <div className="mb-6">
                        <InputField label="E-mail" name="email" type="text" placeholder="exemplo@mail.com" />
                        <InputField label="Senha" name="password" type="password" placeholder="********" />
                    </div>

                    <div className="mb-8 flex justify-center gap-8">
                        <Button type="submit" className="w-2/5" disabled={isSubmitting} onClick={ () => setSubmitting(true) }> Entrar </Button>
                        <Button type="button" variant="ghost" className="text-white w-2/5" disabled={isSubmitting} onClick={ () => formOptions('register') }> Criar uma conta </Button>
                    </div>
                    
                    <hr className="mb-4 border-t border-slate-700" />
                    
                    <div className="mb-4 flex flex-col gap-4 items-center">
                        <Label className="text-slate-400 text-base"> Ou entre usando </Label>

                        <div className="flex justify-center gap-8">
                            <Button type="button" variant="secondary" disabled={isSubmitting} className="w-4/5 gap-1 text-white text-base">
                                <FaGoogle className="mr-2" size={18} /> Google
                            </Button>
                            <Button type="button" variant="secondary" disabled={isSubmitting} className="w-4/5 text-white text-base">
                                <FaGithub className="mr-2" size={18} /> GitHub
                            </Button>
                        </div>
                    </div>
            </Form>

        </Formik>
    )

}
