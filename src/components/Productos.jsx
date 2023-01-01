import { Fragment,useEffect } from "react";
import Producto from "./Producto";
//Redux
import { useSelector,useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import Loading from "./Loading";

const Productos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
       //Consultar la api
       const cargarProductos = () => dispatch(obtenerProductosAction());
       cargarProductos(); 
       //eslint-disable-next-line
    }, []);

    //Obtener el state
    const productos = useSelector(state => state.productos.productos);
    const error     = useSelector(state => state.productos.error); 
    const cargando  = useSelector(state => state.productos.loading);
    
    return (  
      <Fragment>
        <h2 className="text-center my-5">Listado de Productos</h2>
        {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>:null}
        {cargando ? <Loading /> :
        <table className="table table-striped">
          <thead className="bg-primary table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {
            productos.length > 0 ? (
              productos.map(producto => (
                 <Producto
                   key={producto.id} 
                   producto={producto}
                 />
              ))
            ) : (
              <tr><td>No hayProductos</td></tr>
            )
           }
          </tbody>
          </table>
         }
      </Fragment>
    );
}
 
export default Productos
