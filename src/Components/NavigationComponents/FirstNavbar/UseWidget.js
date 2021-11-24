import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { cartContext } from "../../../CartContext";

 const UseWidget =({name})=>{

     const[carrito] = useContext(cartContext);

    return (
        <>
        <Link to={`/${name}`} style={{textDecoration:'none'}}>
            <div> 
                <button className={name === 'cart' ? 'cart' : 'admin'} ></button>
                <div style={name === 'cart'? {display:'block'} : {display:'none'}} className='itemCounter'>{carrito.reduce((total, item)=>{return total + item.cantidad}, 0)}</div>
            </div>
        </Link>
        </>
    )
}

export default UseWidget;