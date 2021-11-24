import React, {useContext} from 'react'
import { cartContext } from '../../CartContext';


const CartItem = ({data}) => {

    const [carrito, setCarrito] = useContext(cartContext);
    
    const addItemCart=()=>{

        if( data ){
            data.cantidad= data.cantidad+1;

            let result = carrito.filter((item)=>{

                if( data.id === item.id){
                    return data
                }else{
                    return item
                }
            })
            setCarrito([...result])
        }
    }
    const removeItemCart=()=>{

        let result= []
               
        data.cantidad= data.cantidad-1;

        if(data.cantidad <= 0){

            result = carrito.filter((item)=>{

                if( data.id === item.id){
                    return null
                }else{
                    return item
                }
            })
        }
        else{
            result = carrito.filter((item)=>{

            if( data.id === item.id){
                return data
            }else{
                return item
            }
        })
        }
        setCarrito([...result])
    }

    return (
        <>
            <div className="imgCart">
                <img src={data.image1}  alt="" width='200px' />
                <h3>{data.name}</h3>
            </div>

            <div className="cantidadCart">
                <button onClick={ addItemCart} className='cartMas'>agregar</button>
                <p>{data.cantidad}</p>
                <button className='cartMenos' onClick={removeItemCart}>quitar</button>
            </div> 
            <p className='cartPrice'>precio:<span>{data.price}</span> $  c/u</p>
            <p className='cartPrice'>total articulo:<span>{data.price * data.cantidad }</span>$</p>
        </>
    )
}
export default CartItem
