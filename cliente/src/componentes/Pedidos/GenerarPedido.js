import React from 'react';

import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../mutations';

import { withRouter } from 'react-router-dom';

// este es un componente de tipo stateless functional, significa que no tiene state o this.state...

const validarPedido = (props) => {
    let noValido = !props.productos || props.total <= 0;
    return noValido;
}

const GenerarPedido = (props) => {
    //console.log(props);
    return (
        <Mutation 
            onCompleted={ () => props.history.push('/clientes') }
            mutation={NUEVO_PEDIDO}>
            {nuevoPedido => (
                <button 
                    disabled={validarPedido(props)}
                    hidden={validarPedido(props)}
                    onClick={e => {
                        //console.log(props.productos);
                        // nombre, precio, stock se van eliminar despues tenemos 1 copia del objeto(...objeto) con los campos que hemos decidido mantener en la copia deforma automatica que serian id y cantidad
                        const productosInput = props.productos.map(({nombre, precio, stock, ...objeto}) =>
                        objeto);
                        //console.log(productosInput);
                        const input = {
                            pedido: productosInput,
                            total: props.total,
                            cliente: props.ClienteID,
                            vendedor: props.idVendedor
                        }
                        //console.log(input);
                        
                        // mandarlo por el mutation
                        nuevoPedido({
                            variables: {input}
                        })
                    }}
                    type="button" 
                    className="btn btn-warning mt-4">
                    Generar Pedido
                </button>
            )}
        </Mutation>
    );
}
// con el withRouter, ya nos va a poner props history disponible en este mutation
export default withRouter(GenerarPedido);
