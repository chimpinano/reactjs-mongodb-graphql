//import React, { Component, Fragment } from 'react';
import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Importar componentes
import Header from './componentes/Layout/Header';

import Clientes from './componentes/Clientes/Clientes'
import NuevoCliente from './componentes/Clientes/NuevoCliente';
import EditarCliente from './componentes/Clientes/EditarCliente';

import Productos from './componentes/Productos/Productos';
import NuevoProducto from './componentes/Productos/NuevoProducto';
import EditarProducto from './componentes/Productos/EditarProducto';

import NuevoPedido from './componentes/Pedidos/NuevoPedido'
import PedidosCliente from './componentes/Pedidos/PedidosCliente';
import Panel from './componentes/Panel/Panel';

import Registro from './componentes/Auth/Registro';
import Login from './componentes/Auth/Login';

// componente de tipo: Hight Order Component
import Session from './componentes/Session';

/*class App extends Component {
  render() {
    return (
*/

// sera un componente stateless functional
const isObjectEmpty = (Obj) => {
  for(var key in Obj) {
    if(Obj.hasOwnProperty(key))
      return false;
    }
  return true;
}

const App = ({refetch, session}) => {
  
  //console.log("session", session)
  const { obtenerUsuario } = session;

  let url = window.location.pathname;
  //let filename = url.substring(url.lastIndexOf('/')+1);
  let mensaje = '';
  if(!isObjectEmpty(obtenerUsuario)) {
    mensaje = (obtenerUsuario) ? 
    `Bienvenido: ${obtenerUsuario.nombre}` : 
    url !== '/login' ? <Redirect to="/login" /> : '';
  }

    //console.log(obtenerUsuario)
    // si la session ya expiro, mandarlo al login
  /*if(!obtenerUsuario){
    //this.props.history.push('/login')
    //this.history.pushState(null, 'login');
    //Router.push('/login');
  }*/

  return (
    
    <Router>
      <Fragment>
        <Header session={session} />
        <div className="container">
        
        <p className="text-right">{ mensaje }</p>

          <Switch>
            <Route exact path="/clientes" render={ () => <Clientes session={session} /> } />
            <Route exact path="/clientes/nuevo" render={ () => <NuevoCliente session={session} /> } />
            <Route exact path="/clientes/editar/:id" component={EditarCliente} />
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route exact path="/productos/editar/:id" component={EditarProducto} />
            <Route exact path="/pedidos/nuevo/:id" render={ () => <NuevoPedido session={session} /> } />
            <Route exact path="/pedidos/:id" component={PedidosCliente} />
            <Route exact path="/registro" render={ () => <Registro session={session} /> } />
            <Route exact path="/login" render={() => <Login refetch={refetch} /> } />
            <Route exact path="/panel" component={Panel} />
          </Switch>
        </div>
      </Fragment>
    </Router>
    
  )
}
/*    );
  }
}
*/

//export default App;

// el nuevo componente rodenado a todo el contenido del App Component y a su vez todos los demas componentes
const RootSession = Session(App);

export { RootSession }

