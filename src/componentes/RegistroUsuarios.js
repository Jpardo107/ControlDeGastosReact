import React, {useState} from 'react'
import Helmet from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import Boton from './../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import {ReactComponent as Svglogin} from './../imagenes/registro.svg';
import styled from 'styled-components';
import {auth} from './../firebase/firebaseConfig'
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword } from "firebase/auth";
import Alerta from '../elementos/alerta';


const Svg = styled(Svglogin)`
width: 100%;
max-height: 6.25rem;
margin-bottom: 1.25rem;
`
const RegistroUsuarios = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState('')
  const [password, establecerPassword] = useState('')
  const [password2, establecerPassword2] = useState('')
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false)
  const [alerta, cambiarAlerta] = useState({})
  const handleChange = (e) => {
    switch(e.target.name){
      case 'correo':
        establecerCorreo(e.target.value);
        break;
      case 'password':
        establecerPassword(e.target.value);
        break;
      case 'password2':
        establecerPassword2(e.target.value);
        break;
      default:
        break;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false)
    cambiarAlerta({})
    //COMPROBAR DEL LADO DEL CLIENTE QUE EL CORREO SEA VALIDO
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if(correo === '' || password === '' || password2 === ''){
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ingrese todos los datos porfavor'
      });
      return
    }
    if(!expresionRegular.test(correo)){
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ingrese un correo valido porfavor'
      });
      return
    }
    if(password !== password2){
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Las contraseñas no coinciden'
      });
      return
    }
    

    try{
      await createUserWithEmailAndPassword(auth,correo, password);
      navigate('/');
    }
    catch(error){
      cambiarEstadoAlerta(true)
      let mensaje;
      switch(error.code){
        case 'auth/invalid-password':
          mensaje = 'Contraseña debe ser de al menos 6 caracteres'
          break;
        case 'auth/email-already-exists':
          mensaje = 'El correo electronico proporcionado ya tiene una cuenta creada'
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electronico no es valido'
          break;
        default:
          mensaje = 'Hubo un error al crear al usuario'
          break;
      }
      cambiarAlerta({tipo: 'error', mensaje: mensaje})
      establecerCorreo('');
      establecerPassword('');
      establecerPassword2('');
    }
  }
  return ( 
      <>
        <Helmet>
          <title>Registro de usuario</title>
        </Helmet>
        <Header>
          <ContenedorHeader>
            <Titulo>Crear Cuenta</Titulo>
            <div>
              <Boton to='/iniciar-sesion'>Iniciar sesion</Boton>
            </div>
          </ContenedorHeader>
        </Header>
        <Formulario onSubmit={handleSubmit}>
          <Svg></Svg>
            <Input 
              type='correo'
              name='correo'
              placeholder='Correo Electronico'
              value={correo}
              onChange={handleChange}
            />
            <Input 
              type='password'
              name='password'
              placeholder='Password (6 o mas caracteres)'
              value={password}
              onChange={handleChange}
            />
            <Input 
              type='password'
              name='password2'
              placeholder='Repetir password'
              value={password2}
              onChange={handleChange}
            />
            <ContenedorBoton>
              <Boton as='button' primario type='submit'>Crear Cuenta</Boton>
            </ContenedorBoton>
        </Formulario>
        <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta}/>
      </>
   );
}
 
export default RegistroUsuarios;