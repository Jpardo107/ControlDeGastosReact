import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import InicioSesion from './componentes/InicioSesion';
import ListadeGastos from './componentes/ListadeGastos';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import {Helmet} from "react-helmet";
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider} from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import Error404 from './componentes/Error404';
import {TotalGastadoProvider} from './contextos/TotalGastadoMesContext'


WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});
const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path='*' element={<Error404/>} />
                <Route path='/iniciar-sesion' element={<InicioSesion/>}/>
                <Route path='/crear-cuenta' element={<RegistroUsuarios/>}/>
                <Route path='/gastos-categoria' element={
                <RutaPrivada>
                  <GastosPorCategoria/>
                </RutaPrivada>
                }/>
                <Route path='/editar-gasto/:id' element={
                <RutaPrivada>
                  <EditarGasto/>
                </RutaPrivada>}/>
                <Route path='/lista-gasto' element={
                <RutaPrivada>
                  <ListadeGastos/>
                </RutaPrivada>}/>
                <Route path='/' element={
                <RutaPrivada>
                  <App />
                </RutaPrivada>}/>
              </Routes>
            </Contenedor> 
          </BrowserRouter>
        </TotalGastadoProvider>
        
      </AuthProvider>
      
      <Fondo/>
    </>
    
   );
}
ReactDOM.render(<Index/>,document.getElementById('root'));