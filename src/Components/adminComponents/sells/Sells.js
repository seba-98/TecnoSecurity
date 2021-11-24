import React, {useEffect, useState} from 'react'
import BackButton from '../../widgets/backButton/BackButton';
import SellItem from './SellItem';
import Preload from '../../widgets/preload/Preload';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../../firebase.config';

const Sells = () => {

    const[sells, setSells]= useState([]);
    const[req, setReq]= useState(false);
    const[dataOpenSell, setDataOpenSell]=useState(false);
    const[sell, setSell]=useState([]);

    const [volver, setVolver]= useState('◄')

    useEffect(()=>{
        const getSells = async()=>{
            let arr=[];
            const docRef= collection(db, 'sells');
            const data= await getDocs(docRef);
            data.forEach(sell=>{ arr.push({...sell.data(), id:sell.id}) });
            setSells([...arr]);
            setTimeout(()=>{setReq(true)},500)
        }
        getSells();
    }, [])


    //estilos del boton, se utilizo un boton con los mismos estilos que el componente de botonBack para el segundo boton ya que el componente
    //backButton es para rutas y en este caso se trata de un renderizado condicional para retroceder a una ventana
    const style={
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        fontSize: '35px',
        padding: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'chartreuse'
    }
    const styleBack={
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '35px',
        padding: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'chartreuse'
    }

    return (
        <form action="">                    {/*Renderizado condicional,  varia entre el backButton para rutas y un button de html
                                             con los mismos estilos pero para cambiar el componente en la misma ruta */}

        {dataOpenSell === false ? <BackButton /> : <button style={volver=== '◄'? style : styleBack} 
                                                        onMouseOut={()=>{setVolver('◄')}}  
                                                        onMouseOver={()=>{setVolver('Volver')}}
                                                        onClick={()=>{setDataOpenSell(false)}}
                                                    > 
                                                    {volver}
                                                    </button>}
					
				                                       

        <h3 style={{fontSize:'25px', color:'black'}}>Gestión de ventas</h3>

        {dataOpenSell === false ?
            <div className='ulSells' >
                 { sells && sells.map((Item, idx)=>{
                    return (
                        <div className='itemSell' key={idx} onClick={()=>{
                            setDataOpenSell(Item.id)
                            setSell(Item)
                            }}>
                        {
                            req===false ?<Preload widthImg='100px'/> : 
                            <>
                                <p>ID Compra: {Item.id}</p>
                                <p>Cliente: {Item.name}</p>
                            </>  
                        }   
                        </div>
                    )
                })}  
        </div>
        :
        <SellItem data={sell}/>
        }
    </form>
    )
}

export default Sells
