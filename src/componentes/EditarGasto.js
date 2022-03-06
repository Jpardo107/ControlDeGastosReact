import React from 'react'
import Helmet from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import { Header, Titulo } from '../elementos/Header';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import { useParams } from 'react-router-dom';
import useObtenerGasto from '../Hooks/useObtenerGasto';

const EditarGasto = () => {
  const {id} = useParams();
  const [gasto] = useObtenerGasto(id);
  return ( 
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>
      <Header>
          <BtnRegresar ruta='/lista-gasto'/>
          <Titulo>Editar gasto</Titulo>
      </Header>
      <FormularioGasto gasto ={gasto}/>
      <BarraTotalGastado />
    </> 
   );
}
 
export default EditarGasto;