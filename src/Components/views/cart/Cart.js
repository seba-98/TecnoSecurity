import React, {useContext} from 'react'
import { cartContext } from '../../../CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../../CartComponents/CartItem';
import './carrito.css';
import BackButton from '../../widgets/backButton/BackButton';
import ScrollToTop from '../../widgets/scrollTop/ScrollToTop';

const Cart = () => {

    const [carrito, setCarrito] = useContext(cartContext);
    const set=()=>{return carrito.reduce((total, item)=>{return total + item.cantidad*item.price}, 0)}

    const vaciar = ()=>{
        setCarrito([]);
    }
        return (
        <section className='cartContainer'>
            <ScrollToTop />
    
            <div><BackButton/></div>
            {carrito.length>0 &&
            <>
                <ul>
                    {
                        carrito.map((item, idx)=>{
                            return(<li key={idx}><CartItem data={item}/></li>)
                    })
                    }
                </ul>
                
                <p className='total'>Precio total: <span>{set()}</span>$</p>
                    <div className='vaciar-container'>
                        <Link to='cart/form' style={{textDecoration:'none'}}><button className='cartMas'>Finalizar compra</button></Link>
                    <button className='cartMenos' onClick={vaciar}>Vaciar carrito</button>
                    </div>
            </>
            }
            {carrito.length<=0 &&
            <ul>
                <div className='vaciar-container'>
                    <h3>No hay artículos en el carrito</h3>
                    <Link to='/home' style={{textDecoration:'none'}}><button className='cartMas'>Volver al inicio</button></Link> 
                </div>
            </ul>
            
            }
        </section>
        )
}
export default Cart
