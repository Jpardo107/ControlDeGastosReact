import {useState, useEffect} from 'react'
import useObtenerGastosMes from './useObtenerGastosMes'

const useObtenerGastosPorCategoriaMes = () => {
  const[gastosPorCategoria, cambiarGastosPorCategoria] = useState([])
  const gastos = useObtenerGastosMes()

  useEffect(()=>{
    const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
      const categoriaActual = objetoActual.categoria
      const cantidadActual = objetoActual.total
  
      objetoResultante[categoriaActual] += cantidadActual;
      return objetoResultante
      }, {
        'comida': 0,
        'cuentas y pagos': 0,
        'Hogar': 0,
        'transporte': 0,
        'ropa': 0,
        'salud e higiene': 0,
        'compras': 0,
        'diversion': 0,
      })
      cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
          return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
      }))
  }, [gastos, cambiarGastosPorCategoria])

    
  return gastosPorCategoria;
}
 
export default useObtenerGastosPorCategoriaMes;