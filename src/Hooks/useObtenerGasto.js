import {doc, getDoc } from 'firebase/firestore'
import {useEffect, useState} from 'react'
import { db } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const useObtenerGasto = (id) => {
  const navigate = useNavigate()
  const[gasto, establecerGasto] = useState('')
  useEffect(() =>{
    const obtenerGasto = async () =>{
      const documento = await getDoc(doc(db, 'Gastos', id))
     
      if(documento.exists){
        establecerGasto(documento)
      }else{
        navigate('/lista-gasto')
      }
    }

    obtenerGasto();
  }, [navigate, id])
  
  return [gasto];
}
 
export default useObtenerGasto;
