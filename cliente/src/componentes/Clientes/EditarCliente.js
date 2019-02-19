import React, { Component, Fragment } from 'react';
import {CLIENTE_QUERY} from '../../queries';
import {Query} from 'react-apollo';
import FormularioEditarCliente from './FormularioEditarCliente';
import { ACTUALIZAR_CLIENTE } from '../../mutations';

class EditarCliente extends Component {
    state = {}
    render(){
        // tomar el ID del contacto a Editar
        const {id} = this.props.match.params;
        // refetch: sera 1 funcion que cuando nosotros decidamos llamarla va a volver a realizar la consulta
        return (
            <Fragment>
                <h2 className="text-center">Editar Cliente</h2>

                <div className="row justify-content-center">
                    <Query 
                         query={CLIENTE_QUERY} 
                         variables={{id}} 
                         refetchQueries={ACTUALIZAR_CLIENTE}>
                        {({ loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error! ${error.message}`;
                            
                            console.log(data);
                            console.log(this.props);

                            return (
                                <FormularioEditarCliente 
                                    cliente={data.getCliente}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );

    }
}

export default EditarCliente;
