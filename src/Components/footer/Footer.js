import React from 'react'
import './styleFooter.css'
import loc from '../../images/footer_icons/location.png'
import mail from '../../images/footer_icons/email.png'
import tel from '../../images/footer_icons/contact.png'

//social
import fb from '../../images/footer_icons/fb.jpg'
import ig from '../../images/footer_icons/ig.jpg'
import wp from '../../images/footer_icons/wp.jpg'


const Footer = () => {
    return (
        <section className='footer'>
            <ul className='ulContent'>
                <li className='liContent'>
                    <ul className='ulLiContent'>
                        <li><h3>Ubicación </h3></li>
                        <li><img src={loc} width='30px' alt=""/><p> Partido Gral pueyrredón</p></li>
                    </ul>
                </li>
                <li className='liContent'>
                    <ul className='ulLiContent'>
                        <li><h3>Contacto</h3></li>
                        <li><img src={mail} width='30px' alt=""/><p>  tecnosecurity@gmail.com</p></li>
                        <li><img src={tel} width='30px' alt=""/><p>+22367578</p></li>
                    </ul>
                </li>
                <li className='liContent'>
                    <ul className='ulLiContent'>
                        <li><h3>Servicios</h3></li>
                        <li><p>Venta de sistemas de seguridad </p></li>
                        <li><p>Asesoramiento sobre tecnología de seguridad</p></li>
                    </ul>
                </li>
            </ul>
            <ul className='networks'>
                <li><img src={fb} width='50px' alt=""/></li>
                <li><img src={ig} width='50px' alt=""/></li>
                <li><img src={wp} width='50px' alt=""/></li>
            </ul>
        </section>
    )
}

export default Footer
