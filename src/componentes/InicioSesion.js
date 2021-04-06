import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Boton from '../elementos/Boton';
import { ContenedorBoton, Formulario, Input } from '../elementos/ElementosDeFormulario';
import { ContenedorHeader, Header, Titulo } from '../elementos/Header';
import { ReactComponent as SvgLogin } from '../imagenes/login.svg';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width:100%;
    max-height:12.5rem; /* 200 px*/
    margin-bottom:1.25rem; /* 20 px */
`;

const InicioSesion = () => {
    const history = useHistory();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            establecerCorreo(e.target.value);
        } else if (e.target.name === 'password') {
            establecerPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        //Comprobamos del lado del cliente que el correo sea válido.
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (!expresionRegular.test(correo)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa un correo electrónico válido'
            });
            return;
        }

        if (correo === '' || password === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los datos'
            });
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(correo, password);
            history.push('/');
        } catch (error) {
            cambiarEstadoAlerta(true);
            let mensaje;
            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;

                case 'auth/user-not-found':
                    mensaje = 'No se eencontró ninguna cuenta con este correo electrónico'
                    break;

                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }
            cambiarAlerta({
                tipo: 'error',
                mensaje: mensaje
            });
        }
    }

    return (
        <>
            <Helmet>
                <title>Iniciar sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta" >Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit} >
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={handleChange} />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleChange} />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario >Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta} />
        </>
    );
}

export default InicioSesion;