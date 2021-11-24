import React, {useState, useEffect, useContext} from 'react';
import './itemDetail.css'
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../firebase.config';
import { cartContext } from '../../../CartContext';
import swal from 'sweetalert';
import ErrorPage from '../../errorPage/ErrorPage';

//-----load y deafult img
import Preload from '../../widgets/preload/Preload';
import def from '../../../images/default.png'
import BackButton from '../../widgets/backButton/BackButton';


const ItemDetail = ({match}) => {

    const id =match.params.id;

    const [
        carrito, 
        setCarrito,
        ]= useContext(cartContext);

    const [article, setArticle] = useState({});
    const [cantidad, setCantidad] = useState(0);
    const [reqReady, setReqReady] = useState(true)    
 

    useEffect(()=>{

      ////////////////////-------- funcion carrito de compras (localStorage)--------- /////////////////////////////
      const cantStorageEqualCantidad = () => {
        //funcion para ver si el articulo en el array del localStorage es igual a la cantidad
        // y setear el estado de la cantidad a ese valor
        const stor = localStorage.getItem("carrito")? JSON.parse(localStorage.getItem("carrito")) : [];
          
        let coincidence = [];

        if (stor.length > 1) {
          coincidence = stor.find((i) => i.id === id);
          if (coincidence) {
            const cant = coincidence.cantidad !== undefined ? coincidence.cantidad : 0;
            setCantidad(cant);
          } 
          else {
            setCantidad(0);
          }
        } else if (stor.length > 0 && stor[0].id === id) {
          coincidence = { ...stor[0] };
          if (coincidence) {
            const cant =
              coincidence.cantidad !== undefined ? coincidence.cantidad : 0;
            setCantidad(cant);
          } else {
            setCantidad(0);
          }
        }
      };
      ////////////////////--------fin funcion carrito de compras (localStorage)--------- /////////////////////////////

      const dataResponse = async () => {
         
              const docRef = doc(db, "allProducts", id);
              const docSnap = await getDoc(docRef);
              docSnap.data() === undefined ? setArticle(false) : setArticle({ ...docSnap.data(), id: id });
              setTimeout(()=>{setReqReady(false)},500)
      }
      cantStorageEqualCantidad();
      dataResponse();
    },[id])
    
    const addItem=()=>{
        const newItem = {...article, cantidad: cantidad};
        const artInCart= carrito.find(i=> i.id=== article.id);
        if( artInCart && artInCart.id === article.id){
            const index= carrito.indexOf(artInCart)
            carrito.splice(index, 1);
            setCarrito([...carrito, newItem])
        }else if(!artInCart ){
            setCarrito([...carrito, newItem])
        }

        swal({
            title: `Tienes ${cantidad} unidades Del producto ${article.name} en el carrito`,
            icon: "success",
          });
    }

    const removeItem=()=>{
        const newItem = {...article, cantidad: cantidad};
        const artInCart= carrito.find(i=> i.id=== article.id);
        
        if(artInCart && cantidad===0){
            const index= carrito.indexOf(artInCart)
            carrito.splice(index, 1);
            setCarrito([...carrito])
        }
        else if( artInCart && artInCart.id === article.id){
            const index= carrito.indexOf(artInCart)
            carrito.splice(index, 1);
            setCarrito([...carrito, newItem])
        }else if(!artInCart ){
            setCarrito([...carrito])
        }

        swal({
            title: `Eliminaste el producto ${article.name} del carrito`,
            icon: "warning",
          });
    }

    const sumar=()=>{
        setCantidad(cantidad+1)
    }
    const restar=()=>{
        setCantidad(cantidad-1)
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

    return(

    reqReady===true ? <div className='vistaArticulo'>
                         <Preload style={stylePreload} widthImg='100%' />
                      </div>

                      :

                    article !== false ? 

                    <div className='vistaArticulo'>
                        <div className="articleDetail">
                                <h3  className='title'>{article.name}</h3>
                                <div>
                                    <BackButton />
                                </div>
                            <div className='imagesContent'>
                                <img src={article.image1} alt=""/>
                                <img src={article.image2 !== null && article.image2 && article.image2 !== undefined ? article.image2 : def } alt=""/>
                            </div>

                            <div className='descContent'>
                                <p className='articleInfo'>{article.info}</p>
                                <p className='price'>Precio: {article.price}$</p>
                            </div>

                        <div className="counterWidgetContent">
                            <div className="cantidadDetailContent">
                                <div className="cantidadDetail">
                                    <button className='sumar' onClick={sumar}>+</button>
                                    <p>{cantidad}</p>
                                    <button className='restar' disabled={cantidad>=1 ? false : true} onClick={restar}>-</button>
                                </div>
                            </div>
                            <p className='textUnity'>unidad/es(seleccionadas)</p>
                        </div>
                            {
                            cantidad > 0 &&
                                <div className='botonAdd'>
                                    <button onClick={addItem} className='botonMas'>Dejar {cantidad} en el carrito</button>
                                </div>
                            }
                            {
                            cantidad === 0 &&
                                <div className='botonAdd'>
                                    <button className='botonMenos' onClick={removeItem}>Actualizar carrito</button>
                                </div>
                            }                
                        </div>
                    </div>

                    :
                    <ErrorPage />
        
        ) 
    
    }
export default ItemDetail
 