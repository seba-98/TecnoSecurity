import React from 'react'
import './destacados.css'

const ItemDestacado = ({nombre, info, image1}) => {


    return (
            <div className='card'>

                <img src={image1} alt="" />
                <h3>{nombre}</h3>
                <p>{info}</p>
                <div className='botonAñadir'>
                    <button>Ver producto</button>
                </div>

            </div> 
    )
}



export default ItemDestacado
