import React, { useEffect, useState } from 'react'
import { getDocs, deleteDoc, collection, doc,  } from '@firebase/firestore';
import { db } from '../../firebase.config'
import {  } from 'react/cjs/react.development';
import swal from 'sweetalert';
import BackButton from '../widgets/backButton/BackButton';
import Preload from '../widgets/preload/Preload';

 const Remove = () => {
    const[products, setProducts]= useState([]);
    const[req, setReq]= useState(false);
    

    const dataRequest = async()=>{
        const arr=[];
        const dest= await getDocs(collection(db, 'allProducts'));
        dest.forEach(producto=>{
            arr.push({...producto.data(), id:producto.id})
        });
        setProducts(arr);
        setTimeout(()=>{setReq(true)},500)
    }
    useEffect(()=>{
        dataRequest();
    },[])

   
    const remove= async(e, id)=>{
        e.preventDefault();
        await deleteDoc(doc(db, "allProducts", id)).then(response=>{
            swal({
                title: `Producto ${id} Borrado`,
                icon: "success"
              });
        });
        dataRequest();
    }
    return (
             <form action="">
                <BackButton />
                <h3 style={{fontSize:'25px', color:'black'}}>Remover productos</h3>
                    <div className='ulDelete'>
                        {products && products.map((Item, idx)=>{
                            return (
                                <div className='itemDelete' key={idx}>
                                {
                                    req===false ?<Preload widthImg='100px'/> : 
                                    <>
                                        <img src={Item.image1} alt="" width='80px'  />
                                        <p>{Item.name}</p>
                                        <button className='buttonDelete' onClick={(e)=>{remove(e, Item.id)}}>Eliminar</button>
                                    </>  
                                }   
                                </div>
                            )
                        })} 
                </div>
            </form>
    )
}
export default Remove;