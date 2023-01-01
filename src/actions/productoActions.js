import {
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
  CERRAR_DESCARGA_PRODUCTOS
} from '../types';

import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async dispatch => {
      
       try {
        const url = import.meta.env.VITE_API_URL;
        const resp = await fetch(url,{
          method: 'POST',
          body : JSON.stringify(producto),
          headers:{
              'Content-Type': 'application/json'
          }
        });
        if(!resp.ok){
          const msg = `Hubo un error "${resp.status} ${resp.statusText}"`;
          throw new Error(msg);
        }
        //Si todo sale bien, actualizar state
        dispatch(agregarProductoExito(producto))
        Swal.fire(
          'Correcto',
          'El producto se agregó correctamente',
          'success'
        )
       } catch (error) {
         console.log(error);
         //Si hay un error cambiar state
         dispatch(agregarProductoError(true)); 

         //Alerta de error
         Swal.fire({
           icon:'error',
           title:'Hubo un error',
           text:'Hubo un error,intenta de nuevo'
         })
       }
     }
}


//Si el producto se guardo en la base de datos
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

//Si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload:estado
});


//Función que descarga los productos de la base de datos
export function obtenerProductosAction(){
   return async dispatch => {
      
      dispatch(descargaProductos())

      try {
        const url = import.meta.env.VITE_API_URL;
        const resp = await fetch(url);
        
        if(!resp.ok){
          const msg = `Hubo un error "${resp.status} ${resp.statusText}"`;
          throw new Error(msg);
        }

        const resultado = await resp.json();
        dispatch(descargaProductoExitosa(resultado))
      } catch (error) {
        console.log(error);
        dispatch(descargaProductoError());
      }

      setTimeout(() => {
        dispatch(cerrarCargandoProducto())
     },1000);
   }
}

const descargaProductos = () => ({
   type:COMENZAR_DESCARGA_PRODUCTOS,
   payload:true
});

const descargaProductoExitosa = productos => ({
  type:DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargaProductoError = () => ({
  type:DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

//Ocultar el componente cargando de home
const cerrarCargandoProducto = () => ({
  type:CERRAR_DESCARGA_PRODUCTOS,
  payload:false
})

//Selecciona y elimina el producto
export function borrarProductoAction(id){
  return async dispatch => {
     dispatch(obtenerProductoEliminar(id));
     try {
      const url = `${import.meta.env.VITE_API_URL}/${id}`;
      await fetch(url,{
        method:'DELETE'
      })
      dispatch(eliminarProductoExito());
      //Si se elimina,mostrar alerta
      Swal.fire(
        'Eliminado',
        'El producto se eliminó correctamente',
        'success'
      )
      } catch (error) {
       console.log(error)
       dispatch(eliminarProductoError());
     }
   }
}

const obtenerProductoEliminar = id => ({
  type:OBTENER_PRODUCTO_ELIMINAR,
  payload:id
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type:PRODUCTO_ELIMINADO_ERROR,
  payload:true
})

//Colocar producto en edición
export function obtenerProductoEditar(producto){
   return dispatch => {
      dispatch(obtenerProductoEditarAction(producto))
   }
}

const obtenerProductoEditarAction = producto => ({
   type:OBTENER_PRODUCTO_EDITAR,
   payload:producto
})

//Editar un registro en la api y state
export function editarProductoAction(producto){
  return async dispatch => {

     try {
      const url = `${import.meta.env.VITE_API_URL}/${producto.id}`;
      await fetch(url,{
          method:'PUT',
          body : JSON.stringify(producto),
          headers:{
              'Content-Type': 'application/json'
          }
      });
      dispatch(editarProductoExito(producto))
     } catch (error) {
       console.log(error);
       dispatch(editarProductoError())
     }
  }
}

const editarProductoExito = producto => ({
  type:PRODUCTO_EDITADO_EXITO,
  payload:producto
})

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload:true
})






