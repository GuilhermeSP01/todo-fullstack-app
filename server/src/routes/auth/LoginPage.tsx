import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage, Formik, Form, useField } from "formik";
import * as Yup from 'yup';

const InputField = ({ label, ...props }: 
    { label: string; name: string; [key: string]: any }) => {

    const [field] = useField(props);

    return(
        <div>
            <label htmlFor={props.name}> {label} </label>
            <Input {...field} {...props} />
            <ErrorMessage name={props.name} />
        </div>
    )
}

export default function LoginPage() {

    return(
        <div>
            <h1> Login Page </h1>
            
            <Formik initialValues={{ email: '', password: '' }} 
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('E-mail inválido')
                    .required('Campo obrigatório'),
                password: Yup.string()
                    .min(3, 'Deve conter no mínimo 3 caracteres')
                    .max(15, 'Deve conter no máximo 15 caracteres')
                    .required('Campo obrigatório')})} 
            onSubmit={(values, actions) => { 
                console.log({ values, actions }); 
                alert(JSON.stringify(values, null, 2)); 
                actions.setSubmitting(false);}}>

                <Form>
                    <InputField label="E-mail" name="email" type="text" placeholder="E-mail" />
                    <InputField label="Senha" name="password" type="password" placeholder="Senha" />
                    <Button type="submit"> Enviar </Button>
                </Form>

            </Formik>

        </div>
    )
}