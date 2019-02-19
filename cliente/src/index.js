import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import App from './App';
import { RootSession } from './App';

import * as serviceWorker from './serviceWorker';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    // Nota: La direfencia entre el fetchOptions y request, es que el request se va a ejecutar en cada pagina y va a revisar que siempre tengamos un token valido
    // Enviar token al servidor
    // fetchOptions solo corre una vez y le pasamos las credenciales para que las incluya
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
      // Request con este setContext se comunica con el Backend en cada una de las peticiones
      // estara revisando en cada una de las paginas que el usuario este autenticado
      // Nota: con setContext envio datos desde el cliente hacia el servidor
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    },
    cache: new InMemoryCache({
      addTypename: false
    }),
    onError: ({networkError, graphQLErrors}) => {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError);
    }
});

//Old ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <ApolloProvider client={client}>
        <RootSession />
    </ApolloProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
