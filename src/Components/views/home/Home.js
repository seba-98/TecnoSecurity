import React from 'react'           //-------Contenedor que renderizará el carrito, el landing , destacados etc

//-------------components------------------------
import Landing from '../../HomeComponents/landing/Landing';
import ListaDestacados from '../../HomeComponents/Destacados/ListaDestacados';
import SecondNavbar from '../../NavigationComponents/SecondNavbar/SecondNavbar';
import './header.css';
import './itemContainer.css';

const Home = () => {

    return (
        <div className="contenedor">
            <Landing />
            <ListaDestacados />
            <SecondNavbar />
        </div>
    )
}
export default Home
