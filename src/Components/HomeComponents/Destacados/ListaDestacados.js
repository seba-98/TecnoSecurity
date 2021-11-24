import React, {useState, useEffect} from 'react'
import ItemDestacado from './ItemDestacado'
import { Link } from 'react-router-dom';
import { collection, getDocs, where, query } from '@firebase/firestore';
import { db } from '../../../firebase.config';
import Preload from '../../widgets/preload/Preload';

//---------------react-sticks.carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from '../../../react-stick-settings/settings';//configuracion de la libreria reactSticks

const ListaDestacados = () => {
    
    const [destacados, setDestacados] = useState([]);
    const [reqReady, setReqReady] = useState(true)

    useEffect(()=>{
        const dataRequest = async()=>{
            const arr=[];
            const dest = query(collection(db, 'allProducts'), where('destac', '==', true));
            const data = await getDocs(dest)

            data.forEach(producto=>{
                arr.push({...producto.data(), id:producto.id})
            });
            setDestacados(arr);
            setTimeout(()=>{setReqReady(false)},500)
        }
        dataRequest();
    },[])

    const stylePreload ={
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '300px',
        height: '500px',
        margin: 'auto',
        padding: '0px',
        marginTop: '20px',
        backgroundColor: '#fff',
        border: '2px solid #e2e2e2',
    }

    return(
        <>
            <h3 className='destTitle'>Artículos destacados</h3>
            <div className="destacados">
                <Slider {...settings}>
                        { destacados.map((obj, idx)=>{
                                return(
                                    reqReady===true ? 
                                        <Preload key={idx} style={stylePreload} widthImg='100%'/>
                                    :
                                    <div key={idx}>
                                        <Link to={`/article/${obj.id}`} style={{textDecoration:'none'}}>
                                            <ItemDestacado nombre={obj.name} info={obj.info} image1={obj.image1}/>
                                        </Link>    
                                    </div>
                                )
                            })
                        }
                </Slider>
            </div>
        </>
    );
}

export default ListaDestacados
