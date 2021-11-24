import React from 'react'

const SellItem = ({data}) => {
    return (
        <div className='sellItemContent'>
            <section className='sellItemData'>
                <h3>Cliente: {data.name}</h3>
            </section>
            <section className='sellItemData'>
                <p>Email: {data.email}</p>
            </section>
            <section className='sellItemData'>
                <p>ID Venta: {data.id}</p>
            </section>
            <section className='sellItemData'>
                <p>Provincia: {data.prov}</p>
            </section>
            <section className='sellItemData'>
                <p>Ciudad: {data.city}</p>
            </section>
            <section className='sellItemData'>
                <p>Codigo postal: {data.cp}</p>
            </section>
            <section className='sellItemData' style={{marginBottom:'30px'}}>
                <p>Domicilio: {data.location}</p>
            </section>
            <section className='sellItemData'>
                <h3>Productos</h3>
            </section>
        
            {
                data.dataProduct.map((product,idx)=>{

                    return(
                        <section className='sellItemData' key={idx}>
                            <p>Nombre: {product.nameProduct}</p>
                            <p>Unidades: {product.cantProduct}</p>
                            <p>Total del producto: {product.totalProductPrice} $</p>
                        </section>
                    )
                })
            }
            <section className='sellItemData'>
                <h3>Precio final: {data.finalPrice}$</h3>
            </section>
        </div>
    )
}

export default SellItem
