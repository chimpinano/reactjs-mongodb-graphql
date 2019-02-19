import React from 'react';
// permite conectarte con otros componentes, sin necesidad de ir pasando información en cada uno de ellos
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const cerrarSessionUsuario = (cliente, history) => {
    localStorage.removeItem('token');
    // desloguear, este resetStore se encarga de limpiar todas las consultas que apollo cachea
    cliente.resetStore();
    // redireccionar
    history.push('/login');
}

const CerrarSession = ({history}) => (
    // ml = margin a la izquierda, mt = margin top
    <ApolloConsumer>
        {cliente => {
            return (
                <button 
                    onClick={() => cerrarSessionUsuario(cliente, history)}
                    className="btn btn-light ml-md-2 mt-2 mt-md-0">
                    Cerrar Session
                </button>
            );
        }}
    </ApolloConsumer>
)

export default withRouter(CerrarSession);
