import React from 'react';
import {Header, Titulo} from './../elementos/Header'
import Helmet from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../Hooks/useObtenerGastos';
import {Lista,
	ElementoLista,
	Categoria,
	Descripcion,
	Valor,
	Fecha,
	ContenedorBotones,
	BotonAccion,
	BotonCargarMas,
	ContenedorBotonCentral,
	ContenedorSubtitulo,
	Subtitulo} from './../elementos/ElementosDeLista'
import IconoCategoria from './../elementos/IconoCategoria'
import FormatearCantidad from '../Funciones/ConvertirMoneda';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg'
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg'
import { Link } from 'react-router-dom';
import Boton from '../elementos/Boton';
import {format, fromUnixTime} from 'date-fns'
import { es } from 'date-fns/locale';
import borrarGasto from '../firebase/BorrarGasto';

const ListadeGastos = () => {
  const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos()
  const formatearFecha = (fecha) =>{
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es}) 
  }
  const fechaEsigual = (gastos, index, gasto) =>{
    return index !== 0 && (formatearFecha(gastos[index -1].fecha) === formatearFecha(gasto.fecha))
    }
  return ( 
    <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>
      <Header>
          <BtnRegresar/>
          <Titulo>Lista de gastos</Titulo>
      </Header>
      <Lista>
        {gastos.map((gasto, index) =>{
          return(
            <div key={gasto.id}>
              {!fechaEsigual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
              <ElementoLista key={gasto.id}>
                <Categoria>
                  <IconoCategoria nombre={gasto.categoria} />
                  {gasto.categoria}
                </Categoria>
                <Descripcion>
                  {gasto.descripcion}
                </Descripcion>
                <Valor>
                  {FormatearCantidad(gasto.total)}
                </Valor>
                <ContenedorBotones>
                  <BotonAccion as = {Link} to={`/editar-gasto/${gasto.id}`}>
                    <IconoEditar/>
                  </BotonAccion>
                  <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                    <IconoBorrar/>
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          )
        })}
        {hayMasPorCargar &&
          <ContenedorBotonCentral>
            <BotonCargarMas onClick={() => obtenerMasGastos()}>Cargar mas</BotonCargarMas>
          </ContenedorBotonCentral>
        }
        {gastos.length === 0 &&
        <ContenedorSubtitulo>
          <Subtitulo>No hay gastos por mostrar</Subtitulo>  
          <Boton as={Link} to={'/'}>Agregar Gasto</Boton>
        </ContenedorSubtitulo>}
      </Lista>
      <BarraTotalGastado />
    </> 
   );
}
export default ListadeGastos;