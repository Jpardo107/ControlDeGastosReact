import {db} from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const agregarGasto = ({categoria, descripcion, total, fecha, uidUsuario}) =>{

  return addDoc(collection(db, 'Gastos'), {
    categoria: categoria,
    descripcion: descripcion,
    total: Number(total),
    fecha: fecha,
    uidUsuario: uidUsuario
  })
}

export default agregarGasto