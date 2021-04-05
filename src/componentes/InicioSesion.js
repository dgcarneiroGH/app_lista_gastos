import React from 'react';
import { Helmet } from 'react-helmet';
import Boton from '../elementos/Boton';
import { ContenedorBoton, Formulario, Input } from '../elementos/ElementosDeFormulario';
import { ContenedorHeader, Header, Titulo } from '../elementos/Header';
import { ReactComponent as SvgLogin } from '../imagenes/login.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
    width:100%;
    max-height:12.5rem; /* 200 px*/
    margin-bottom:1.25rem; /* 20 px */
`;

const InicioSesion = () => {
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

            <Formulario>
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico" />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña" />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario >Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
    );
}

export default InicioSesion;