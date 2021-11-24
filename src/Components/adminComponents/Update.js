import React, {useState} from 'react'
import { db, app } from '../../firebase.config';
import { doc, updateDoc, getDoc } from '@firebase/firestore';
import swal from 'sweetalert';
import BackButton from '../widgets/backButton/BackButton';
import { useFormik } from 'formik';
import * as Yup from 'yup'

const Update = () => {

    const formik= useFormik({
        initialValues:{
            category:'',
            section:'',
            name:'',
            info:'',
            price:''
        },
        onSubmit:(data, {resetForm})=>{
           
        const docRef = doc(db, 'allProducts', id);
        updateDoc(docRef, product).then(r=>{
            swal({
                    title: "Producto Actualizado",
                    icon: "success",
                }); 
                setId('')
                setUpdateProduct(false)
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

   
    const [id, setId]= useState('');
    const[image1, setImage1]= useState('');
    const[image2, setImage2]= useState('');
    const[updateProduct, setUpdateProduct] = useState(false)


    const product ={
        category:formik.values.category,
        destac: formik.values.section === 'destacados' ? true : false,
        image1: image1,
        image2: image2,
        info: formik.values.info.trim(),
        name: formik.values.name.trim(),
        price: formik.values.price,
    }


    const saveImages= async (e) =>{
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


    const search = async (e) =>{ //Funcion para encontrar el producto a actualizar y setear sus valores por defecto
        e.preventDefault();
        const docRef = doc(db, 'allProducts', id);

        try{//al encontrar el producto habilitamos los campos y los rellenamos por defecto con los datos originales del producto
            const document = await getDoc(docRef);
            console.log(document.data())

            formik.setFieldValue('category', document.data().category)
            formik.setFieldValue('section', document.data().destac)
            formik.setFieldValue('name', document.data().name)
            formik.setFieldValue('info', document.data().info)
            formik.setFieldValue('price', document.data().price)

            setImage1(document.data().image1)
            setImage2(document.data().image2)

            setUpdateProduct(true)
        }
        catch(error){
            console.log(error)
            swal({
                title: "Producto no encontrado",
                icon: "warning",
                });
                setUpdateProduct(false) //si el producto no se encuentra, este estado queda en false y los campos inhabilitados
        }
    }


    const inputError={ border: '1px solid red'};
    const textError={color: 'red'};

    return (
            <form action="" onSubmit={formik.handleSubmit}>
                <BackButton />
                <h3 style={{fontSize:'25px', color:'black'}}>Actualizar producto</h3>
                <div className="formGroup">
                    <label htmlFor="">ID del producto</label>
                    <input type="text" name="id" id=""className='places' onChange={(e) => {setId(e.target.value)}} value={id}/><button onClick={(e)=>{search(e)}}>Buscar</button>
                </div>
                <h3 style={{fontSize:'25px', color:'black'}}>{!updateProduct ? 'Ingrese el id para poder actualizar un producto' : 'Producto encontrado puede realizar cambios'} </h3>
                <div className="formGroup">
                    <label htmlFor="">Imagenes</label>
                    <input type="file" name="imagenes" multiple className='places' disabled={updateProduct ? false : true} id="" onChange={(e)=>{saveImages(e)}}/>
                </div>

                <div className="formGroup">
                    <label htmlFor="">Categoría</label>
                    <select name="category" id="" className='places' disabled={updateProduct ? false : true} onChange={formik.handleChange} value={formik.values.category} style={formik.errors.category && inputError}>
                        <option value="kit">Kit cctv</option>
                        <option value="accesory">accesorios</option>
                        <option value="camera">camaras</option>
                    </select>
                    {formik.errors.category && <label htmlFor="" style={textError}>{formik.errors.category}</label>}
                </div> 
                <div className="formGroup">
                    <label htmlFor="">Sección</label>
                    <select name="section" id="" className='places' disabled={updateProduct ? false : true} onChange={formik.handleChange} value={formik.values.section} style={formik.errors.section && inputError}>
                        <option value="allProducts">Todos los productos</option>
                        <option value="destacados">Destacados</option>
                    </select>
                    {formik.errors.section && <label htmlFor="" style={textError}>{formik.errors.section}</label>}
                </div>
                <div className="formGroup">
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" id=""className='places' disabled={updateProduct ? false : true}  onChange={formik.handleChange} value={formik.values.name} style={formik.errors.name && inputError}/>
                    {formik.errors.name && <label htmlFor="" style={textError}>{formik.errors.name}</label>}
                </div>
                <div className="formGroup">
                    <label htmlFor="">Descripción</label>
                    <input type="text" name="info"className='places' disabled={updateProduct ? false : true} onChange={formik.handleChange} id="" value={formik.values.info} style={formik.errors.info && inputError}/>
                    {formik.errors.info && <label htmlFor="" style={textError}>{formik.errors.info}</label>}
                </div>
                <div className="formGroup">
                    <label htmlFor="">Precio</label>
                    <input type="number" name="price"className='places' disabled={updateProduct ? false : true} onChange={formik.handleChange} id="" value={formik.values.price} style={formik.errors.price && inputError}/>
                    {formik.errors.price && <label htmlFor="" style={textError}>{formik.errors.price}</label>}
                </div>
                <input type="submit" value="Actualizar producto" disabled={updateProduct ? false : true}  className="subYes" />
            </form>
    )
}
export default Update;