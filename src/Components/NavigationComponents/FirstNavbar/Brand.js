import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../images/logo.png'


const Brand = () => {
    return (
        <>
        <Link to='/'>
            <section className="brand"><img src={logo} alt=""/> </section> 
            <div className="brandLine"></div>
        </Link>    
        </>
    )
}
export default Brand;