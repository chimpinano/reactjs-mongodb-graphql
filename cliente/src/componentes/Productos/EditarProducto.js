import React, { Component, Fragment } from 'react';
import {PRODUCTO_QUERY} from '../../queries';
import {Query} from 'react-apollo';
import FormularioEditarProducto from './FormularioEditarProducto';
//import { ACTUALIZAR_CLIENTE } from '../../mutations';

class EditarProducto extends Component {
    state = {}
    render(){
        // tomar el ID del contacto a Editar
        const {id} = this.props.match.params;
        // refetch: sera 1 funcion que cuando nosotros decidamos llamarla va a volver a realizar la consulta
        return (
            <Fragment>
                <h2 className="text-center">Editar Producto</h2>

                <div className="row justify-content-center">
                    <Query 
                         query={PRODUCTO_QUERY} 
                         variables={{id}} 
                         >
                        {({ loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error! ${error.message}`;
                            
                            //console.log(data);
                            //console.log(this.props);

                            return(
                                <FormularioEditarProducto 
                                    producto={data}
                                    id={id}
                                    refetch={refetch} />
                            )

                        }}
                    </Query>
                </div>
            </Fragment>
        );

    }
}

export default EditarProducto;
