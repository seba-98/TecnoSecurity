import React from 'react'
import './errorPage.css'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className='errContent'>

            <h2>Error 404</h2>
            <p>Lo sentimos la pagina que buscas no existe</p>
            <Link to='/home'><button className='cartMas'>Volver al inicio</button></Link> 
        </div>
    )
}

export default ErrorPage
