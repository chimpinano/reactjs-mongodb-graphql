import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import Error from '../Alertas/Error';

import { Mutation } from 'react-apollo';

import { AUTENTICAR_USUARIO } from '../../mutations';

const initialState = {
    usuario : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     actualizarState = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    limpiarState = () => {
         this.setState({...initialState});
    }

    iniciarSesion = (e, usuarioAutenticar) => {
        e.preventDefault();
        usuarioAutenticar().then(async ({data}) => {
            //console.log(data.autenticarUsuario.token)
            localStorage.setItem('token', data.autenticarUsuario.token);

            // ejecutar el Query una vez que se haya iniciado sesion
            await this.props.refetch();

            // limpiar el state
            this.limpiarState();

            // redireccionar
            setTimeout(() => {
                this.props.history.push('/panel');
            }, 3000);
        })
     }

     validarForm = () => {
        const {usuario, password} = this.state;

        const noValido = !usuario || !password;

        //console.log(noValido);
        return noValido;
     }
    render() { 

        const {usuario, password} = this.state;
      
        return ( 
            <Fragment>
                 <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={ AUTENTICAR_USUARIO }
                        variables={{usuario, password}}    
                    >
                    {( usuarioAutenticar, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.iniciarSesion(e, usuarioAutenticar) } 
                                className="col-md-8"
                            >

                            {error && <Error error={error} />}
                            

                            <div className="form-group">
                                <label>Usuario</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={usuario}
                                    type="text" 
                                    name="usuario" 
                                    className="form-control" 
                                    placeholder="Nombre Usuario" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={password}
                                    type="password" 
                                    name="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validarForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Iniciar Sesión
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(Login);
