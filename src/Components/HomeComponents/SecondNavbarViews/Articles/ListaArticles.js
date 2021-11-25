import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import {getDocs, query, collection, where } from '@firebase/firestore';
import { db } from '../../../../firebase.config';
import Preload from '../../../widgets/preload/Preload';
import './articleList.css'
import Article from './Article';

const ListaArticles = () => {

        const[filter, setFilter]= useState([]);
        const[texto, setTexto]= useState([]);
        const [reqReady, setReqReady] = useState(true)

        const dataRequest = async()=>{
                const arr=[];
                const dest= await getDocs(collection(db, 'allProducts'));
                dest.forEach(producto=>{
                    arr.push({...producto.data(), id:producto.id})
                });
                setFilter(arr);
                setTimeout(()=>{setReqReady(false)},500)
            }

        //obtenemos todos los productos y seteamos el filtro con todos
        useEffect(()=>{
            dataRequest();
        },[])
       
    
    //filtramos la consulta por categoria
    const dataRequestCategory = async (category) =>{
        const arr=[];
        const dest= query(collection(db, 'allProducts'), where("category", "==", category));
        const data= await getDocs(dest);
        data.forEach(producto=>{
            arr.push({...producto.data(), id: producto.id})
        });
        setFilter(arr);
    }
  
    //filtramos todos los productos obtenidos, por la cadena de busqueda
    const filtrar = (e, a) =>{

        if(a === 'texto'){

        setTexto(e.target.value);
        setFilter(filter.filter((item)=>{
            return item.name.toLowerCase().includes(e.target.value.toLowerCase())     
        }))
        
        }
        else if(a === 'kit'){
            dataRequestCategory('kit')
        }
        else if(a === 'accesory'){
            dataRequestCategory('accesory')
        }
        else if(a === 'camera'){
            dataRequestCategory('camera')
        }
        else if(a === 'allProducts'){
            dataRequest();
        }
    }

    const stylePreload={
        margin: '40px',
        padding: '30px',
        fontFamily: 'Roboto',
        textAlign: 'left',
        color: 'black',
        width: '300px',
        height: 'auto'
    }
    
    return (
        <section className='content'>
            <div className="filters">
                <div className='filterContainer' action="">
                    <h3>Filtrar busqueda</h3>
                    <div><input type="text" name="category" id="" className='buscador' onChange={(e, a)=>{filtrar(e, 'texto')}} placeholder='Que producto buscas?' value={texto}/></div> 

                    <ul className='dropCategories'>
                        <li className='dropButton'><p>CATEGORÍAS ▼</p>
                            <ul>
                                <li className='buttons' onClick={(e, a)=>{filtrar(e, 'allProducts')}}><button >Todos los productos</button></li>
                                <li className='buttons' onClick={(e, a)=>{filtrar(e, 'kit')}}><button >kit cctv</button></li>
                                <li className='buttons' onClick={(e, a)=>{filtrar(e, 'accesory')}}><button >accesorios</button></li>
                                <li className='buttons' onClick={(e, a)=>{filtrar(e, 'camera')}}><button >camaras</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>    
            </div>

        
            <div className="articleList">
                    {
                        filter.map((art, idx)=>{
                            return(
                                <div key={idx}>
                                    {
                                        reqReady ===true ? <Preload key={idx} style={stylePreload} widthImg='200px'/>
                                        : 
                                        <Link to={`/article/${art.id}`} style={{textDecoration:'none'}}> 
                                            <Article nombre={art.name} info={art.info} image1={art.image1}/>
                                        </Link>  
                                    }
                                </div>
                            )
                        })
                    }
            </div>
        </section>
    )
}

export default ListaArticles
