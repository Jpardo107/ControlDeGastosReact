import React from 'react';
import styled from 'styled-components';
const Error404 = () => {
  return ( 
      <Error>
        <h1> Error 404, Pagina no encontrada</h1>
      </Error>
   );
}
const Error = styled.div`
text-align: center;
justify-content: center;
align-items: center;
`;
 
export default Error404;