import React from 'react';
import { Header, Titulo } from '../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {
    Lista,
    ElementoLista,
    ListaDeCategorias,
    ElementoListaCategorias,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';
import { ReactComponent as IconoEditar } from '../imagenes/editar.svg';
import { ReactComponent as IconoBorrar } from '../imagenes/borrar.svg';
import { Link } from 'react-router-dom';
import Boton from '../elementos/Boton';
import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';

const ListaDeGastos = () => {
    const [gastos] = useObtenerGastos();

    const formatearFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
    }

    const fechaEsIgual = (gastos, index, gasto) => {
        if (index !== 0) {
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaGastoAnterior = formatearFecha(gastos[index - 1].fecha);

            if (fechaActual === fechaGastoAnterior) {
                return true;
            }else{
                return false;
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>

            <Lista>
                {gastos.map((gasto, index) => {
                    return (
                        <div key={gasto.id}>
                            {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
                            <ElementoLista key={gasto.id} >
                                <Categoria>
                                    <IconoCategoria id={gasto.categoria} />
                                    {gasto.categoria}
                                </Categoria>
                                <Descripcion>
                                    {gasto.descripcion}
                                </Descripcion>
                                <Valor>{convertirAMoneda(gasto.cantidad)}</Valor>

                                <ContenedorBotones>
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`} >
                                        <IconoEditar />
                                    </BotonAccion>
                                    <BotonAccion>
                                        <IconoBorrar />
                                    </BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}
                <ContenedorBotonCentral>
                    <BotonCargarMas>Cargar M??s</BotonCargarMas>
                </ContenedorBotonCentral>

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos que mostrar</Subtitulo>
                        <Boton as={Link} to="/">Agregar gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>

            <BarraTotalGastado />
        </>
    );
}

export default ListaDeGastos;