import React from 'react';
import { PRODUCTO_QUERY } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import ResumenProducto from './ResumenProducto';
import { ACTUALIZAR_ESTADO } from '../../mutations';

import '../../pedidos.css';

// este es un componente de tipo stateless functional, significa que no tiene state o this.state...
// Nota: dentro del <Query... siempre se tiene que retornar algo

const Pedido = (props) => {
    // aplicando distrochorin
    const { pedido } = props;
    //console.log(pedido)
    //console.log(props)

    const {id} = pedido;
    //console.log(id)

    const fechaPedido = new Date(Number(pedido.fecha));

    // estado y clases de estado
    const {estado} = pedido;
    console.log(estado)
    let clase;
    if (estado === 'PENDIENTE'){
        clase = 'bg-light';
    } else if (estado === 'CANCELADO'){
        clase = 'border-danger';
    } else {
        clase = 'border-success';
    }

    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${clase}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                            <Mutation mutation={ACTUALIZAR_ESTADO}>
                                {actualizarEstado => (
                                    <select 
                                        className="form-control my-3"
                                        value={pedido.estado}
                                        onChange={e =>{
                                        //console.log(e.target.value)
                                        // esto [id: id] es igual a solo tener id viene en las nuevas versiones javascript
                                        const input = {
                                            id,
                                            pedido: pedido.pedido,
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            cliente: props.cliente,
                                            estado: e.target.value
                                        }
                                        //console.log(input)
                                        actualizarEstado({
                                            variables:{input}
                                        })
                                    }}
                                    >
                                        <option value="PENDIENTE">PENDIENTE</option>
                                        <option value="COMPLETADO">COMPLETADO</option>
                                        <option value="CANCELADO">CANCELADO</option>
                                    </select>
                                )}
                            </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> {fechaPedido.toLocaleString("en-US")}</span>
                    </p>

                    <h3 className="resaltar-texto card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto, index) =>{
                        const {id} = producto;
                        return (
                            <Query 
                                key={pedido.id + index} 
                                query={PRODUCTO_QUERY} 
                                variables={{id}}>
                                {({loading, error, data}) => {
                                    if(loading) return 'Cargando...';
                                    if(error) return `Error ${error.message}`;
                                    //console.log(data);
                                    return (
                                        <ResumenProducto 
                                            key={producto.id}
                                            producto={data.obtenerProducto}
                                            cantidad={producto.cantidad}
                                        />
                                    )
                                }}
                            </Query>
                        )
                    })}

                    <div className="d-flex aling-items-center justify-content-end">
                        <p className="card-text resaltar-texto mr-1 bg-amarillo">Total: </p>
                        <p className="font-weight-normal inc-texto"> $ {pedido.total} </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Pedido;
