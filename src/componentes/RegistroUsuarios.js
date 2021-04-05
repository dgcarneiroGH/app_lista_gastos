import React from 'react';
import { Helmet } from 'react-helmet';
import Boton from '../elementos/Boton';
import { ContenedorBoton, Formulario, Input } from '../elementos/ElementosDeFormulario';
import { ContenedorHeader, Header, Titulo } from '../elementos/Header';
import { ReactComponent as SvgLogin } from '../imagenes/registro.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
    width:100%;
    max-height:6.25rem; /* 100 px*/
    margin-bottom:1.25rem; /* 20 px */
`;

const RegistroUsuarios = () => {
    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion" >Iniciar Sesión</Boton>
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
                <Input
                    type="password"
                    name="password2"
                    placeholder="Confirmar Contraseña" />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario >Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
    );
}

export default RegistroUsuarios;