import React, {useState} from 'react'
import { app } from '../../firebase.config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import swal from 'sweetalert';
import BackButton from '../widgets/backButton/BackButton';

const Login = () => {

    const auth = getAuth(app)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler=async(e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, user, password).then(r=>{
            swal({
                title: `Iniciaste sesión`,
                icon: "success",
              });
        })
        .catch(r=>swal({
            title: `Usuario/email o contraseña incorrectos`,
            icon: "warning",
          }))
    }

    const buttonContent={
        width:'100%',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <div className='formContainer'>
            <form className='loginForm'>
                <div style={buttonContent}><BackButton/></div>
                <h3>Administración de aplicación</h3>
            <div className="loginGroup">
                <label htmlFor="">ID</label>
                <input type="text" value={user} onChange={(e)=>{setUser(e.target.value)}} />
            </div> 
            <div className="loginGroup">
               <label htmlFor="">Contraseña</label>
                <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>     
                <input type="submit" id='sub' value="Ingresar" onClick={(e)=>{submitHandler(e)}} />
            </form>
        </div>
    )
}
export default Login
