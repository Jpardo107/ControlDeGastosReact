import React, {useState, useContext, useEffect}from 'react'
import useObtenerGastosMes from '../Hooks/useObtenerGastosMes';

const TotalGastadoContext = React.createContext();
const useTotalMes = () => useContext(TotalGastadoContext)

const TotalGastadoProvider = ({children}) => {
  const [total, cambiarTotal] = useState(0)
  const gastos = useObtenerGastosMes()

  useEffect(() => {
    let acumulado = 0;
    gastos.forEach((gasto) => {
      acumulado += gasto.total
    })
    cambiarTotal(acumulado)
  }, [gastos])
  return(
    <TotalGastadoContext.Provider value={{total:total}}>
      {children}
    </TotalGastadoContext.Provider>
  )
}

export {TotalGastadoProvider, useTotalMes}