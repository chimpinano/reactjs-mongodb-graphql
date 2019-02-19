import React, { Fragment } from 'react';

// este es un componente de tipo stateless functional, significa que no tiene state o this.state...

const ResumenProducto = ({cantidad, producto}) => {
    //console.log(props)
    
    return (
        <Fragment>
            <div className="contenedor-productos mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Producto:
                    <span className="font-weight-normal"> {producto.nombre}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal"> {cantidad}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio:
                    <span className="font-weight-normal"> ${producto.precio}</span>
                </p>
            </div>

        </Fragment>
    );
}

export default ResumenProducto;
