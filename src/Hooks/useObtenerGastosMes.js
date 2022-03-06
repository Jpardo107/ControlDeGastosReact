import {useState, useEffect} from 'react'
import { db } from '../firebase/firebaseConfig';
import { endOfMonth, startOfMonth, getUnixTime } from 'date-fns';
import {useAuth} from './../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where  } from 'firebase/firestore';


const useObtenerGastosMes = () => {
  const [gastos, establecerGastos] = useState([])
  const {usuario} = useAuth();

  
  useEffect(() => {
    const inicioMes = getUnixTime(startOfMonth(new Date()))
    const finMes = getUnixTime(endOfMonth(new Date()))
    
    if(usuario){
      const consulta = query(
        collection(db, 'Gastos'),
        orderBy('fecha', 'desc'),
        where('fecha', '>=', inicioMes),
        where('fecha', '<=', finMes),
        where('uidUsuario', '==', usuario.uid)
      )
      const unsuscribe = onSnapshot(consulta, (snapshot) => {
        establecerGastos(snapshot.docs.map((documento) => {
          return{...documento.data(), id: documento.id}  
      }))
      }, (error) => {console.log(error)})
      return unsuscribe;
    }
  }, [usuario])

  return gastos;
}
 
export default useObtenerGastosMes;