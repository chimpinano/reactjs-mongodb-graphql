// va a contener toda la session
// sera un componente que va a rodear a todos los demas componentes
// se va a colocar por encima de ellos y va a estar validando que el usuario deveras este autenticado

import React from 'react';
import { Query } from 'react-apollo';
import { USUARIO_ACTUAL } from '../queries';

// componente de tipo: Hight Order Component

// Nota: en cada uno de los componentes vamos a ver quien es el {usuario actual} y si tiene una session valida

const Session = Component => props => {
    return (
        <Query query={USUARIO_ACTUAL}>
        {({loading, error, data, refetch}) =>{
            if (loading) return null;
            // ...props: para pasarle los props a cada uno de los componentes
            // data: vendria siendo la respuesta del servidor al Query de arriba
            return <Component {...props} refetch={refetch} session={data} />
        }}
        </Query>
    )
}

export default Session;
