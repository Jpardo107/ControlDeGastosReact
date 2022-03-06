import React from 'react';
import {Header, Titulo} from './../elementos/Header'
import Helmet from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosPorCategoriaMes from '../Hooks/useObtenerGatosPorCategoriaMes';
import {
	ListaDeCategorias,
	ElementoListaCategorias,
	Categoria,
	Valor,
} from './../elementos/ElementosDeLista'
import IconoCategoria from './../elementos/IconoCategoria'
import FormatearCantidad from '../Funciones/ConvertirMoneda';


const GastosPorCategoria = () => {
  const gastosPorCategoria = useObtenerGastosPorCategoriaMes()
  console.log(gastosPorCategoria)
  return ( 
    <>
      <Helmet>
        <title>Gastos por categoria</title>
      </Helmet>
      <Header>
          <BtnRegresar/>
          <Titulo>Gastos por categoria</Titulo>
      </Header>
      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
          return(
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconoCategoria nombre= {elemento.categoria}/>
                {elemento.categoria}
              </Categoria>
              <Valor>{FormatearCantidad(elemento.cantidad)}</Valor>
            </ElementoListaCategorias>
          )
        })}
      </ListaDeCategorias>
      <BarraTotalGastado />
    </> 
   );
}
 
export default GastosPorCategoria;