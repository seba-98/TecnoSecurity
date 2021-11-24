import React, {useState} from 'react';
import { addDoc, collection} from '@firebase/firestore';
import { db, app } from '../../firebase.config';
import { useFormik } from 'formik';

import swal from 'sweetalert';
import BackButton from '../widgets/backButton/BackButton';
import * as Yup from 'yup';

const Add = () => {

    const formik= useFormik({
        initialValues:{
            category:'kit',
            section:'allProducts',
            name:'',
            info:'',
            price:''
        },
        onSubmit:(data, {resetForm})=>{
           
        addDoc(collection(db, 'allProducts'), product).then(data=>{
            
            setImage1('');
            setImage2('')
            swal({
                title: "Producto creado",
                text: `El id de su producto es: ${data.id}`,
                icon: "success",
            });
            resetForm({data: ''})
            
            })

        },
        validationSchema: Yup.object({
            category: Yup.string('Ingrese categoria').required('Campo requerido'),
            section: Yup.string('Ingrese sección').required('Campo requerido'),
            name: Yup.string('Ingrese nombre').required('Campo requerido'),
            info: Yup.string('Ingrese características').required('Campo requerido'),
            price: Yup.number('Ingrese precio').required('Campo requerido')
        })
    })


    const[image1, setImage1]= useState('');
    const[image2, setImage2]= useState('');
   

    const product ={
        category:formik.values.category,
        destac: formik.values.section === 'destacados' ? true : false,
        image1: image1.trim(),
        image2: image2.trim(),
        info: formik.values.info.trim(),
        name: formik.values.name.trim(),
        price: formik.values.price,
    }


        const loadImg= async (e)=>{

           const file1 = e.target.files[0];
           const file2 = e.target.files[1];
           const storageRef = app.storage().ref();

           console.log(e.target.files)
           
           if(file1 && !file2 &&  ( file1.type !=='image/jpeg' &&  file1.type !=='image/png' && file1.type !=='image/jpg')){

            swal({
                title: "Error al subir",
                text: 'formatos admitidos(.jpg, .png, .jpeg)',
                icon: "warning",
                });

           }
           else if(file1 && file2 && ((file1.type !== 'image/jpeg' && file1.type !== 'image/png'&&  file1.type !== 'image/jpg') || ( file2.type !=='image/jpeg' && file2.type !=='image/png' && file2.type !=='image/jpg'))) {
            swal({
                title: "Error al subir",
                text: 'formatos admitidos(.jpg, .png, .jpeg)',
                icon: "warning",
                });
           }
           else if(file1 && !file2 && (file1.type === 'image/jpeg' || file1.type === 'image/png'|| file1.type === 'image/jpg')){

            const storagePath = storageRef.child(file1.name);
            try{
                const enviar= await storagePath.put(file1)
                console.log(enviar)
                 swal({
                    title: "Imagen subida a la base de datos",
                    icon: "success",
                    });
                 const url1 = await storagePath.getDownloadURL();
                 setImage1(url1)
            }
            catch(error){
                console.log(error)
                swal({
                    title: "error al subir",
                    icon: "warninng",
                    });
            }
           }else if(file1 && file2 && ((file1.type ==='image/jpeg' ||file1.type ==='image/png'|| file1.type ==='image/jpg') && (file2.type === 'image/jpeg' || file2.type ==='image/png'|| file2.type === 'image/jpg'))){
                
                const storagePath = storageRef.child(file1.name);
                const storagePath2 = storageRef.child(file2.name);

                try{
                const enviar1=await storagePath.put(file1)
                const enviar2=await storagePath2.put(file2) 
                console.log(enviar1, enviar2)
                swal({
                    title: "Imagenes subidas a la base de datos",
                    icon: "success",
                });
    
                const url1 = await storagePath.getDownloadURL();
                const url2 = await storagePath2.getDownloadURL();
                setImage1(url1)
                setImage2(url2)
                }
                catch(error){
                    console.log(error)
                    swal({
                        title: "error al subir",
                        icon: "warning",
                        });
                } 
        }
    }

    const inputError={ border: '1px solid red'};
    const textError={color: 'red'};
       
    return (
            <form action="" onSubmit={formik.handleSubmit}>
                <BackButton />
                <h3 style={{fontSize:'25px', color:'black'}}>Añadir producto</h3>

                <div className="formGroup">
                    <label htmlFor="">Imagenes</label>
                    <input type="file" name=""  multiple onChange={(e)=>{loadImg(e)}}/>
                </div>
                <hr/>

                <h3 style={{fontSize:'25px', color:'black'}}>{!image1 && !image2 ? 'Primero debe cargar la imagen antes de completar los campos' : 'Imagen cargada! Puede crear el articulo'}</h3>
                

                <div className="formGroup">
                    <label htmlFor="">Categoría</label>
                    <select name="category"  className='places' disabled={!image1 && !image2 ? true : false}  onChange={formik.handleChange} style={formik.errors.category && inputError}>
                        <option value="kit">Kit cctv</option>
                        <option value="accesory">accesorios</option>
                        <option value="camera">camaras</option>
                    </select>
                    {formik.errors.category && <label htmlFor="" style={textError}>{formik.errors.category}</label>}
                </div> 
                <div className="formGroup">
                    <label htmlFor="">Sección</label>
                    <select name="section"  className='places' disabled={!image1 && !image2 ? true : false} onChange={formik.handleChange} style={formik.errors.section && inputError}>
                        <option value="allProducts">Todos los productos</option>
                        <option value="destacados">Destacados</option>
                    </select>
                    {formik.errors.section && <label htmlFor="" style={textError}>{formik.errors.section}</label>}
                </div>
              
                <div className="formGroup">
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" className='places' disabled={!image1 && !image2 ? true : false} value={formik.values.name} onChange={formik.handleChange} style={formik.errors.name && inputError}/>
                    {formik.errors.name && <label htmlFor="" style={textError}>{formik.errors.name}</label>}
                </div>
                <div className="formGroup">
                    <label htmlFor="">Descripción</label>
                    <input type="text" name="info"className='places' disabled={!image1 && !image2 ? true : false} value={formik.values.info}  onChange={formik.handleChange} style={formik.errors.info && inputError}/>
                    {formik.errors.info && <label htmlFor="" style={textError}>{formik.errors.info}</label>}
                </div>
                <div className="formGroup">
                    <label htmlFor="">Precio</label>
                    <input type="number" name="price"className='places' disabled={!image1 && !image2 ? true : false} value={formik.values.price}  onChange={formik.handleChange} style={formik.errors.price && inputError}/>
                    {formik.errors.price && <label htmlFor="" style={textError}>{formik.errors.price}</label>}
                </div>
                <input type="submit" value="Guardar producto" disabled={!image1 && !image2 ? true : false} onSubmit={formik.handleReset}  className="subYes" />
            </form>
    )
}
export default Add;