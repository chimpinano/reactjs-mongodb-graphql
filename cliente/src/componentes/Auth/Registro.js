import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../../mutations';
import Error from '../Alertas/Error';

import { withRouter, Redirect } from 'react-router-dom';

const initialState = {
    usuario: '',
    password: '',
    repetirPassword: '',
    nombre: '',
    rol: ''
}

class Registro extends Component {
    state = {
        ...initialState
    }

    limpiarState = ()  => {
        this.setState({...initialState})
    }
    
    crearRegistro = (e, crearUsuario) => {
        e.preventDefault();
        //console.log('Creado Registro...');
        crearUsuario().then(data => {
            //console.log(data);
            this.limpiarState();
            // redireccionamos al login
            this.props.history.push('/login');
        })
    }

    actualizarState = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        // name representa al nombre del input que tambien viene siendo el nombre de una propiedad del state
        this.setState({
            [name]: value
        })
    }

    validarForm = () => {
        const { usuario, password, repetirPassword, nombre, rol } = this.state;

        const noValid = !usuario || !password || !nombre || !rol || password !== repetirPassword;

        return noValid;
    }

    render(){
        // vamos aplicar un distrochorin
        const { usuario, password, repetirPassword, nombre, rol } = this.state;

        //console.log(this.props.session);
        const rolUsuario = this.props.session.obtenerUsuario.rol;
        const redireccion = (rolUsuario !== 'ADMINISTRADOR') ? <Redirect to="/clientes" /> : '';

        return ( 
            <Fragment>

                {redireccion}

                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation 
                        mutation={NUEVO_USUARIO}
                        variables={{usuario, password, nombre, rol}} >
                        {(crearUsuario, {loading, error, data}) => {
                            return (
                                <form 
                                    onSubmit={ e => this.crearRegistro(e, crearUsuario)}
                                    className="col-md-8">

                                    { error && <Error error={error}/> }

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
                                        <small className="form-text text-muted">
                                            (Sin espacios y sin caracteres especiales)
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input 
                                            onChange={this.actualizarState}
                                            value={nombre}
                                            type="text" 
                                            name="nombre" 
                                            className="form-control" 
                                            placeholder="Nombre Completo" 
                                        />
                                        <small className="form-text text-muted">
                                            (Agrega el nombre completo y apellidos)
                                        </small>
                                    </div>
        
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
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
                                        <div className="form-group col-md-6">
                                            <label>Repetir Password</label>
                                            <input 
                                                onChange={this.actualizarState}
                                                value={repetirPassword}
                                                type="password" 
                                                name="repetirPassword" 
                                                className="form-control" 
                                                placeholder="Repetir Password" 
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Rol: </label>

                                        <select 
                                            className="form-control" 
                                            value={rol}
                                            name="rol"
                                            onChange={this.actualizarState}
                                             >
                                            <option value="">Elegir...</option>
                                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                            <option value="VENDEDOR">VENDEDOR</option>
                                        </select>

                                    </div>

                                    <button 
                                        disabled={ loading || this.validarForm() }
                                        type="submit" 
                                        className="btn btn-success float-right">
                                            Crear Usuario
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

export default withRouter(Registro);
