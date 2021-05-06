import React from 'react';

import './Login.css';

const Login = () => {
    return (
        <div className="container loginContainer" >
            <div className="loginLogo"></div>
            <h1 className="loginText">INICIA SESIÓN</h1>
            <input type="email" id="email" class="input" placeholder="Ingresa tu email"/>
            <input type="password" id="emailCreateAccount" class="input" placeholder="Ingresa tu contraseña"/>
            <input type="button" id="btnLogin" class="loginButton" value="INICIA SESIÓN"/>
        </div>
    )
};
export default Login;