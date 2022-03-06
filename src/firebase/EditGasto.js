import {db} from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const EditGasto = async ({id, categoria, descripcion, total, fecha}) =>{
  const documento = doc(db, 'Gastos', id)
  return await updateDoc(documento, {
    categoria: categoria,
    descripcion: descripcion,
    total: Number(total),
    fecha: fecha
  })
}

export default EditGasto