import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Puntos} from './../imagenes/puntos.svg'

const Svg = styled.svg`
	height: 50vh;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 0;
	path {
		fill: rgba(60,213,216, .3);
	}
`;

const PuntosArriba = styled(Puntos)`
	position: fixed;
	z-index: 1;
	top: 2.5rem; /* 40px */
	left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
	position: fixed;
	z-index: 1;
	bottom: 2.5rem; /* 40px */
	right: 2.5rem; /* 40px */
`;

const Fondo = () => {
  return ( 
    <>
      <PuntosArriba/>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path 
          fillOpacity="1" 
          d="M0,32L30,69.3C60,107,120,181,180,224C240,267,300,277,360,272C420,267,480,245,540,213.3C600,181,660,139,720,138.7C780,139,840,181,900,213.3C960,245,1020,267,1080,234.7C1140,203,1200,117,1260,85.3C1320,53,1380,75,1410,85.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
        </path>
      </Svg>
      <PuntosAbajo/>
    </>
   );
}
 
export default Fondo;