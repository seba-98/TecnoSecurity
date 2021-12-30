import React from 'react'           //-------Contenedor que renderizará el carrito, el landing , destacados etc

//-------------components------------------------
import Landing from '../../HomeComponents/landing/Landing';
import ListaDestacados from '../../HomeComponents/Destacados/ListaDestacados';
import SecondNavbar from '../../NavigationComponents/SecondNavbar/SecondNavbar';
import './header.css';
import './itemContainer.css';
import ScrollToTop from '../../widgets/scrollTop/ScrollToTop';

const Home = () => {

    return (
        <div className="contenedor">
            <ScrollToTop />
            <Landing />
            <ListaDestacados />
            <SecondNavbar />
        </div>
    )
}
export default Home
