import React, { Component, Fragment } from 'react';
import DatosCliente from './DatosCliente';

import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';

import { withRouter } from 'react-router-dom';

import '../../spinner.css';

import ContenidoPedido from './ContenidoPedido';

class NuevoPedido extends Component {
    render() {
      const {id} = this.props.match.params;

      //console.log(this.props.session)
      const idVendedor = this.props.session.obtenerUsuario.id;

      return (
        <Fragment>
          <h2 className="text-center mb-5">Nuevo Pedido</h2>

          <div className="row">
            <div className="col-md-3">
              <DatosCliente id={id}/>
            </div>
            <div className="col-md-9">
              <Query query={PRODUCTOS_QUERY} variables={{stocks: true}} pollInterval={500}>
                {({ loading, error, data, startPolling, stopPolling }) => {

                  if(loading) return (
                    <div className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                  );

                  if(error) return `Error ${error.message}`;
                  //console.log(data);
                  return (
                    <ContenidoPedido
                      productos={data.obtenerProductos} 
                      id={id}
                      idVendedor={idVendedor} />
                  );
                }}
             </Query>
            </div>
          </div>
        </Fragment>
      );
    }
  }
  
export default withRouter(NuevoPedido);
