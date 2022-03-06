import React, { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import Boton from '../elementos/Boton';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import {ReactComponent as IconoPlus} from './../imagenes/plus.svg';
import DatePicker from './DatePicker';
import SelectCategorias from './SelectCategorias';
import agregarGasto from '../firebase/AgregarGasto';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import {useAuth} from './../contextos/AuthContext'
import Alerta from '../elementos/alerta';
import EditGasto from '../firebase/EditGasto';


const FormularioGasto = ({gasto}) => {
  const [descripcion, cambiarDescripcion] = useState('')
  const [cantidad, cambiarCantidad] = useState('')
  const [categoria, cambiarCategoria] = useState('Hogar')
  const [fecha, cambiarFecha] = useState(new Date())
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false)
  const [alerta, cambiarAlerta] = useState({})
  const {usuario} = useAuth();

  const navigate = useNavigate()
  useEffect(() =>{
    //COMPROBAMOS SI YA HAY UN GASTO CARGADO
    //DE SER ASI, ESTABLECEMOS TODO EL STATE CON LOS VALORES DEL GASTO
    if(gasto){
      //COMPROBAMOS QUE EL GASTO PERTENEZCA AL USUARIO ACTUAL
      //PARA ESO SE COMPRUEBA EL UID DEL USUARIO CON EL UID DEL GASTO
      if(gasto.data().uidUsuario === usuario.uid){
        cambiarCategoria(gasto.data().categoria)
        cambiarCantidad(gasto.data().total)
        cambiarFecha(fromUnixTime(gasto.data().fecha))
        cambiarDescripcion(gasto.data().descripcion)
      }else{
          navigate('/lista-gasto')
      }
    }

  }, [gasto, usuario, navigate])

  const handleChange = (e) => {
    if(e.target.name === 'descripcion'){
      cambiarDescripcion(e.target.value)
    }else if(e.target.name === 'valor'){
      cambiarCantidad(e.target.value.replace(/[^0-9.]/g, ''))
    }
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    let total = parseFloat(cantidad).toFixed(2)

    //COMPROBAMOS DESCRIPCION Y VALOR
    if(descripcion !== '' && cantidad !== ''){
      if(cantidad){
        if(gasto){
          EditGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: descripcion,
            total: total,
            fecha: getUnixTime(fecha),
          }).then(() => {
              navigate('/lista-gasto')
          }).catch((error)=> console.log(error))
        }else{
          agregarGasto({
            categoria: categoria,
            descripcion: descripcion,
            total: total,
            fecha: getUnixTime(fecha), 
            uidUsuario: usuario.uid
          }).then(() => {
            cambiarCategoria('hogar');
            cambiarDescripcion('');
            cambiarCantidad('');
            cambiarFecha(new Date());
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'exito', mensaje:'Gasto ingresado con exito.'})
          }).catch((error) => {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje:'Ocurrio un error, reintente mas tarde porfavor.'});
          })
        }
      }else{
        cambiarEstadoAlerta(true);
        cambiarAlerta({tipo: 'error', mensaje:'Porfavor ingrese una cantidad correcta.'});
        cambiarCategoria('hogar');
        cambiarDescripcion('');
        cambiarCantidad('');
        cambiarFecha(new Date());
      } 
    }else{
        cambiarEstadoAlerta(true);
        cambiarAlerta({tipo: 'error', mensaje:'Porfavor ingrese todos los datos.'});
        cambiarCategoria('hogar');
        cambiarDescripcion('');
        cambiarCantidad('');
        cambiarFecha(new Date());
    }

    
  }

  return ( 
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias categoria ={categoria} cambiarCategoria={cambiarCategoria}/>
        <DatePicker fecha = {fecha} cambiarFecha = {cambiarFecha}/>
      </ContenedorFiltros>
      <div>
        <Input tipo='text' name='descripcion' id='descripcion' placeholder='Descripcion' value={descripcion} onChange={handleChange}/>
        <InputGrande tipo='text' name='valor' id='valor' placeholder='$0.00' value={cantidad} onChange={handleChange} />

      </div>
      <ContenedorBoton>
        <Boton as='button' primario conIcono type='submit'>
          {gasto ? 'Editar Gasto': 'Agregar gasto'}<IconoPlus/></Boton>
      </ContenedorBoton>
      <Alerta 
        tipo = {alerta.tipo}
        mensaje = {alerta.mensaje}
        estadoAlerta = {estadoAlerta}
        cambiarEstadoAlerta = {cambiarEstadoAlerta}
      />
    </Formulario>
   );
}
 
export default FormularioGasto;