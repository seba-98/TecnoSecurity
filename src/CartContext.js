import React, { useState, createContext} from "react";

export const  cartContext = createContext();

export const CartProvider = ({children}) => {

    const storageContent = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    const [carrito, setCarrito] = useState( storageContent );
    const set=()=>{return carrito.reduce((total, item)=>{return total + item.cantidad*item.price}, 0)}
    const [total, setTotal]= useState(set)
    
    localStorage.setItem('carrito', JSON.stringify(carrito)) //actualizamos el carrito en el localStorage
    
    return(

        <cartContext.Provider value={[carrito, setCarrito, set, total, setTotal]}>

            {children}

        </cartContext.Provider>
    );
}


