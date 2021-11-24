import React, {useState} from 'react'

 //components

import Informacion from '../../HomeComponents/SecondNavbarViews/information/Informacion';
import Contacto from '../../HomeComponents/SecondNavbarViews/contact/Contacto';
import ListaArticles from '../../HomeComponents/SecondNavbarViews/Articles/ListaArticles';
import './navigation.css'

const SecondNavbar = () => {
    const [subMenu, setSubMenu] = useState('productos');

    const changeMenu = (e) =>{
        setSubMenu(e.target.id);
    }
    const rend = () =>{

        if(subMenu === 'productos'){
            return <ListaArticles />
        }
        else if(subMenu === 'informacion'){
            return <Informacion />
        }
        else if(subMenu === 'contacto'){
            return <Contacto />
        }
    }
    
    return (
        <>
            <nav className="navigation">
                    <ul>
                        <li><button id='informacion' onClick={changeMenu}>INFORMACIÓN</button></li>
                        <li><button id='productos' onClick={changeMenu}>PRODUCTOS</button></li>
                        <li><button id='contacto' onClick={changeMenu}>CONTACTO</button></li>
                    </ul>
            </nav>
            <section>
                {rend()}
            </section>
        </>    
    )
}

export default SecondNavbar
