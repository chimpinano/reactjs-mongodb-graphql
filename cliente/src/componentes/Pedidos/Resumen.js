import React, { Fragment } from 'react';
import Producto from './Producto';
//import { Query } from 'react-apollo';
//import { CLIENTE_QUERY } from '../../queries';

// sin estado: stateless functional component
// .map, cuando se esta dentro de 1 map es bueno pasarle una KEY

const Resumen = (props) => {
    const productos = props.productos;
    // si no hay productos no mostrar nada
    if (productos.length === 0) return null;

    return (
        <Fragment>
            <h2 className="text-center my-5">Resumen y Cantidades</h2>
            
            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Inventario</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <Producto 
                            key={producto.id}
                            id={producto.id}
                            index={index}
                            producto={producto}
                            actualizarCantidad={props.actualizarCantidad}
                            eliminarProducto={props.eliminarProducto}
                        />
                    ) )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Resumen;