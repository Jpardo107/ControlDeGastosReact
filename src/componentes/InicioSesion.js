import React, {useState} from 'react'
import Helmet from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import Boton from './../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import {ReactComponent as Svglogin} from './../imagenes/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import Alerta from '../elementos/alerta';
import {auth} from './../firebase/firebaseConfig'

const Svg = styled(Svglogin)`
width: 100%;
max-height: 12.5rem;
margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if(e.target.name === 'correo'){
      establecerCorreo(e.target.value);
    } else if(e.target.name === 'password'){
      establecerPassword(e.target.value);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false)
    cambiarAlerta({})
    //COMPROBAR DEL LADO DEL CLIENTE QUE EL CORREO SEA VALIDO
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if(correo === '' || password === ''){
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
    try{
      await signInWithEmailAndPassword(auth, correo, password);
      navigate('/');
    }
    catch(error){
      cambiarEstadoAlerta(true)
      let mensaje;
      switch(error.code){
        case 'auth/invalid-password':
          mensaje = 'Contraseña debe ser de al menos 6 caracteres'
          break;
        case 'auth/user-not-found':
          mensaje = 'Usuario no encontrado'
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electronico no es valido'
          break;
        default:
          mensaje = 'Hubo un error al iniciar session '
          break;
      }
      cambiarAlerta({tipo: 'error', mensaje: mensaje})
      establecerCorreo('');
      establecerPassword('');
    }
  }
  return ( 
    <>
        <Helmet>
          <title>Inicio de sesion</title>
        </Helmet>
        <Header>
          <ContenedorHeader>
            <Titulo>Iniciar sesion</Titulo>
            <div>
              <Boton to='/crear-cuenta'>Crear cuenta</Boton>
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
              placeholder='Password'
              value={password}
              onChange={handleChange}
            />
            <ContenedorBoton>
              <Boton as='button' primario type='submit'>Iniciar sesion</Boton>
            </ContenedorBoton>
        </Formulario>
        <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta}/>

      </>
   );
}
 
export default InicioSesion;