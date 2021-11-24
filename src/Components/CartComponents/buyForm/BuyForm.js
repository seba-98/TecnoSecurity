import React, { useContext, useEffect, useState } from 'react'
import './buyForm.css'
import BackButton from '../../widgets/backButton/BackButton'
import { cartContext } from '../../../CartContext'
import swal from 'sweetalert'
import { addDoc, collection } from '@firebase/firestore'
import { db } from '../../../firebase.config'
import { useFormik} from 'formik'
import * as Yup from 'yup';

const BuyForm = () => {

    const formik=useFormik({
        initialValues:{
            name:'',
            city:'',
            tele:'',
            prov:'',
            email:'',
            cp:'',
            location:''
        },
        onSubmit:(data)=>{
            setCompra(true)
        },
        validationSchema:Yup.object({
            name:Yup.string('Ingrese nombre').required('Campo requerido').min(8, 'Minimo 8 carácteres'),
            city: Yup.string('Ingrese ciudad').required('Campo requerido'),
            tele:Yup.number('Ingrese solo números').required('Campo requerido'),
            email: Yup.string('Ingrese Email').required('Campo requerido'),
            cp: Yup.number('Ingrese solo números').required('Campo requerido'),
            location: Yup.string('Ingrese ciudad').required('Campo requerido'),
            prov: Yup.string('Ingrese provincia').required('Campo requerido'),
        })
    })
    

    const [compra, setCompra] =useState(false);
    const [carrito, setCarrito] = useContext(cartContext);
    const set=()=>{return carrito.reduce((total, item)=>{return total + item.cantidad*item.price}, 0)}

    const[dataProduct, setDataProduct] = useState([]);

    
    useEffect(()=>{
        setDataProduct(()=>{
            const arr= carrito.map(item=>{
                return {
                       nameProduct: item.name,
                       cantProduct: item.cantidad,
                       totalProductPrice: item.price * item.cantidad
                    } 
            })
            return arr;
        })
    },[carrito])
    
    
    const sellData={
        name: formik.values.name? formik.values.name.trim().replace(/ /gi, "_") : '',
        tel: formik.values.tele,
        email: formik.values.email? formik.values.email.trim().replace(/ /gi, "_") : '',
        location: formik.values.location? formik.values.location.trim().replace(/ /gi, "_") : '',
        city: formik.values.city? formik.values.city.trim().replace(/ /gi, "_") : '',
        prov: formik.values.prov? formik.values.prov.trim().replace(/ /gi, "_") : '',
        cp: formik.values.cp,
        dataProduct: dataProduct,
        finalPrice:set()
    }


    const buy=(e)=>{
        e.preventDefault()
        const docRef= collection(db, 'sells');
        addDoc(docRef, sellData ).then(r=>{
            swal({
                title:'Compra realizada!',
                text:'Se informará por email y teléfono los medios de pago',
                icon:'success'
            })
            setCarrito([])
            setCompra(false)
        }) 
        
    }


    const styleInputErr={
        border:'1px solid red'
    }
    const styleTextErr={
       color: 'red'
    }

    return (
        <div className='buyFormContainer'>

            <div className='modal' style={compra===false ? {display:'none'}:{display:'flex'} }>
                <div className='buyInfo'>
                    <div className='closeButtonContent'><button onClick={()=>{setCompra(false)}}>✕</button></div>
                        <div className='itemsModalContent'>
                            <h2 style={{color:'black'}}>Usted esta comprando</h2>
                            {
                                carrito.map((item, idx)=>{
                                    return(
                                        
                                        <div key={idx} className='buyDescription'>
                                            <p>{item.name}</p>
                                            <p>Cantidad {item.cantidad} unidades</p>
                                            <p>Precio {item.cantidad * item.price}$</p>
                                        </div>
                                    )
                                })
                            }
                            <div className='buyDescription'>
                                <p>precio final:{set()}$</p>
                            </div>
                            <div className='buyDescription'>
                                <p>DATOS DE CLIENTE</p>
                                <p>nombre y apellido: {sellData.name}</p>
                                <p>telefono: {sellData.tel}</p>
                                <p>email: {sellData.email}</p>
                                <p>dirección: {sellData.location}</p>
                                <p>ciudad: {sellData.city}</p>
                                <p>provincia: {sellData.prov}</p>
                                <p>código postal: {sellData.cp}</p>
                                <button type="submit" className='sendButton' onClick={(e)=>{buy(e)}}>Finalizar compra</button>
                                
                            </div>
                        </div>
                </div>
            </div>

            <BackButton route='/cart'/>

            <form  className='buyForm' onSubmit={formik.handleSubmit}>
                <h2>Formulario de compra</h2>

                {set()=== 0 ? 
                <h3>(Carrito vacío) debe tener productos en el carrito para registrar una compra</h3>
                :
                <>
                <section className='inputContainer' >
                    <div className='buyFormGroup'>
                        <label htmlFor="">Nombre y apellido</label>
                        <input type="text" name="name" id="" onChange={formik.handleChange} style={formik.errors.name && styleInputErr}/>
                        {formik.errors.name && <label style={styleTextErr}>{formik.errors.name}</label>}
                    </div>
                    <div className='buyFormGroup'>
                        <label htmlFor="">Ciudad</label>
                        <input type="text" name="city" id=""  onChange={formik.handleChange} style={formik.errors.city && styleInputErr}/>
                        {formik.errors.city && <label style={styleTextErr}>{formik.errors.city}</label>}
                    </div>
                    <div className='buyFormGroup'>
                        <label htmlFor="">Teléfono</label>
                        <input type="number" name="tele" id=""  onChange={formik.handleChange} style={formik.errors.tele && styleInputErr} />
                        {formik.errors.tele && <label style={styleTextErr}>{formik.errors.tele}</label>}
                    </div>
                    <div className='buyFormGroup'>
                        <label htmlFor="">Provincia</label>
                        <input type="text" name="prov" id=""  onChange={formik.handleChange} style={formik.errors.prov && styleInputErr}/>
                        {formik.errors.prov && <label style={styleTextErr}>{formik.errors.prov}</label>}
                    </div>
                    <div className='buyFormGroup'>
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="" onChange={formik.handleChange} tyle={formik.errors.email && styleInputErr} />
                        {formik.errors.email && <label style={styleTextErr}>{formik.errors.email}</label>}
                    </div>
                    <div className='buyFormGroup'>
                        <label htmlFor="">Código postal</label>
                        <input type="number" name="cp" id=""  onChange={formik.handleChange} style={formik.errors.cp && styleInputErr}/>
                        {formik.errors.cp && <label style={styleTextErr}>{formik.errors.cp}</label>}
                    </div>
                    <div className='buyFormGroup'>
                        <label htmlFor="">Domicilio</label>
                        <input type="text" name="location" id=""  onChange={formik.handleChange} style={formik.errors.location && styleInputErr} />
                        {formik.errors.location && <label style={styleTextErr}>{formik.errors.location}</label>}                            
                    </div>
                </section>
                <input type="submit" className='sendButton' value="Registrar compra" />
                </>
                }
                
            </form>
        </div>
    )
}

export default BuyForm
