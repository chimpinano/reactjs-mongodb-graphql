import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries';

// stateless functional component

// pollInterval por si alguien realiza cambios en ese cliente

const DatosCliente = ({id}) => {
    return (
        <Fragment>
            <h2 className="text-center mb-3">Resumen de Cliente</h2>
            
            <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return 'Cargando...';
                    if(error) return `Error ${error.message}`;
                    //console.log(data.getCliente);
                    const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente;
                    
                    return (
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">Nombre:
                                <span className="font-weight-normal"> {nombre}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Apellido:
                                <span className="font-weight-normal"> {apellido}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Edad:
                                <span className="font-weight-normal"> {edad}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Emails:
                                <span className="font-weight-normal"> 
                                    {emails.map(mails => ` ${mails.email}`)}
                                </span>
                            </li>
                            <li className="border font-weight-bold p-2">Empresa:
                                <span className="font-weight-normal"> {empresa}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Tipo:
                                <span className="font-weight-normal"> {tipo}</span>
                            </li>
                        </ul>
                    );
                }}
            </Query>
        </Fragment>
    );
}

export default DatosCliente;