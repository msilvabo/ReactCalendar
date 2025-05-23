
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormField = {
    loginEmail : '',
    loginPassword : ''
};
const registerFormField = {
    registerName : '', 
    registerEmail : '', 
    registerPassword1 : '', 
    registerPassword2:''
};

const validationLogin = {
    loginEmailValid: [
        (value) => false, 'El correo debe tener un @'
    ],
}
export const LoginPage = () => {
  
    const { starLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange, formState: LoginformState, isFormValid: isLoginFormValid } = useForm(loginFormField, validationLogin);
    const { registerName, registerEmail, registerPassword1, registerPassword2, onInputChange: onRegisterInputChange, formState: RegisterformState } = useForm(registerFormField);

    const loginSubmit = (event) => {
        event.preventDefault();
        starLogin({email:loginEmail, password:loginPassword});
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        console.log({registerName, registerEmail, registerPassword1, registerPassword2});
         
    }

    useEffect(() => {
        if (errorMessage){
            Swal.fire('Error autentificación', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
          
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value = {loginEmail}
                                onChange={ onLoginInputChange}
                                autoComplete ="loginEmail"

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value = {loginPassword}
                                onChange={ onLoginInputChange}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="form-group mb-2 "  style={{textAlign:'center', marginTop:'30px'}}>
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value = {registerName}
                                onChange={ onRegisterInputChange}
                                autoComplete="registerName"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value = {registerEmail}
                                onChange={ onRegisterInputChange}
                                autoComplete="registerEmail"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword1"
                                value = {registerPassword1}
                                onChange={ onRegisterInputChange}
                                autoComplete='registerPassword1'
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value = {registerPassword2}
                                onChange={ onRegisterInputChange}
                                autoComplete='registerPassword2'
                            />
                        </div>

                        <div className="form-group mb-2" style={{textAlign:'center', marginTop:'30px'}}>
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}