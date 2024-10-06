import { ErrorMessage, Formik, useField, Form } from "formik";
import { FaGoogle, FaGithub } from 'react-icons/fa';
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

    return(
        <Formik initialValues={{ email: '', password: '' }} 
        validationSchema={Yup.object({
            username: Yup.string()
                .required('* Preencha este campo')
                .min(4, 'Deve conter no mínimo 4 caracteres')
                .max(15, 'Deve conter no mínimo 15 caracteres')
                .matches(/^[a-zA-Z0-9]+$/, 'Nome inválido'),
            email: Yup.string()
                .email('E-mail inválido')
                .required('* Preencha este campo')
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'E-mail inválido'),
            password: Yup.string()
                .min(8, 'Deve conter no mínimo 8 caracteres')
                .max(15, 'Deve conter no máximo 15 caracteres')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Deve conter letra maiúscula, minúscula, número e caractere especial')
                .required('* Preencha este campo'),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
                .required('* Preencha este campo')})} 
        onSubmit={(values, actions) => { 
            console.log({ values, actions }); 
            alert(JSON.stringify(values, null, 2)); 
            actions.setSubmitting(false);}}>
                
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
                        <Button type="submit" className="w-2/5"> Cadastrar </Button>
                        <Button type="button" variant="secondary" className="text-white w-2/5" onClick={ () => formOptions('login') }> Login </Button>
                    </div>
                    
                    <hr className="mb-4 border-t border-slate-700" />
                    
                    <div className="mb-4 flex flex-col gap-4 items-center">
                        <Label className="text-slate-400 text-base"> Ou entre usando </Label>

                        <div className="flex justify-center gap-8">
                            <Button type="button" variant="outline" className="w-4/5 gap-1 text-white text-base">
                                <FaGoogle className="mr-2" size={18} /> Google
                            </Button>
                            <Button type="button" variant="outline" className="w-4/5 text-white text-base">
                                <FaGithub className="mr-2" size={18} /> GitHub
                            </Button>
                        </div>
                    </div>
            </Form>

        </Formik>
    )

}
