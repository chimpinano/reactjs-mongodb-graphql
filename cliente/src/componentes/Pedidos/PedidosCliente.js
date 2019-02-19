// contiene todos los pedidos que un determinado cliente tiene
import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { PEDIDOS_QUERY } from '../../queries';
import Pedido from './Pedido';
import '../../spinner.css';

// este es un componente de tipo stateless functional, significa que no tiene state o this.state...
// Nota: dentro del Query el loading es para presentar algo mientras carga la pagina
// mientras que el pollInterval, startPolling, stopPolling, son para evitar el cache de apollo

const PedidosCliente = (props) => {
    //console.log(props)
    // no aplica distrochorin
    const cliente = props.match.params.id;
    //console.log(cliente)
    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos del Cliente</h1>

            <div className="row">
                <Query query={PEDIDOS_QUERY} variables={{cliente}} pollInterval={500}>
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return (
                            <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                            </div>
                        );
                        if(error) return `Error ${error.message}`;
                        //console.log(data)
                        return (
                            data.obtenerPedidos.map(pedido => (
                                <Pedido 
                                    key={pedido.id}
                                    pedido={pedido}
                                    cliente={cliente} />
                            ))
                        )
                    }}
                </Query>
            </div>

        </Fragment>
    );
}

export default PedidosCliente;
