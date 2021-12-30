import React, { useState } from 'react'
import './admin.css'
//components
import Add from '../../adminComponents/Add';
import Remove from '../../adminComponents/Remove';
import Sells from '../../adminComponents/sells/Sells';
import Update from '../../adminComponents/Update';
import Login from '../../adminComponents/Login';
import swal from 'sweetalert';
import { app } from '../../../firebase.config';
import { getAuth, onAuthStateChanged, signOut} from '@firebase/auth';
import ScrollToTop from '../../widgets/scrollTop/ScrollToTop';

const auth = getAuth(app)

const Admin = () => {

    const [manageWindow, setManageWindow] = useState('add');
    const [usuarioGlobal, setUsuarioGlobal] = useState(null);

    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUsuarioGlobal(user)
      }else{
        setUsuarioGlobal(null)
      }  
    })

    const render=()=>{
        if(manageWindow==='add'){
            return <Add/>
        }
        else if(manageWindow==='update'){
            return <Update/>
        }
        else if(manageWindow==='remove'){
            return <Remove/>
        }
        else if(manageWindow==='sells'){
            return <Sells/>
        }
    }

    if(usuarioGlobal != null){

        return (
            <>

            <ScrollToTop />
                <div style={{paddingTop:manageWindow === 'remove' ? '200px' : '100px'}}></div>
                <div className='formContainer' style={{marginBottom: '50px'}}>
                    <h2>Panel de administración</h2>
                    <h3>Elije acciones sobre tus productos</h3>
                    <nav>
                        <ul>
                            <li style={{backgroundColor: manageWindow==='add' && 'green'}} onClick={()=>{setManageWindow('add')}}>Añadir</li>
                            <li style={{backgroundColor: manageWindow==='remove' && 'green'}} onClick={()=>{setManageWindow('remove')}}>Borrar</li>
                            <li style={{backgroundColor: manageWindow==='update' && 'green'}} onClick={()=>{setManageWindow('update')}}>Actualizar</li>
                            <li style={{backgroundColor: manageWindow==='sells' && 'green'}} onClick={()=>{setManageWindow('sells')}}>Ventas</li>
                            <li onClick={()=>{
                                signOut(auth)
                                swal({
                                    title: `Cerraste sesión`,
                                    icon: "warning",
                                  });
                                }}>Cerrar sesión</li>
                        </ul>
                    </nav>
                { render()}
                </div>
            </>
            )
    }else{
        return <Login />
    }
}
export default Admin
