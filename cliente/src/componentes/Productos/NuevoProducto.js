import React, { Component, Fragment } from 'react';

import {NUEVO_PRODUCTO} from '../../mutations';
import { Mutation } from 'react-apollo';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class NuevoProducto extends Component {
    state = {
        // a los 3 puntos se le llama: spread operator.
        // Y crea 1 copia de lo que esta arriba, y lo asigna aquí
        ...initialState
    }

    limpiarState = () => {
        this.setState({
            // queda aquí, para usarlo como punto de reset
            ...initialState
        })
    }

    actualizarState = e => {
        const { name, value } = e.target;
        // todo esto es posible por que los nombres en los inputs se llaman igual al State
        this.setState({
            [name] : value
        })
    }

    validarForm = () => {
        const { nombre, precio, stock } = this.state;
        // para que se cumpla la condición las 3 tienen que tener algo
        const noValido = !nombre || !precio || !stock;
        return noValido;
    }

    crearNuevoProducto = (e, nuevoProducto) => {
        e.preventDefault();
        // insertamos en la Base de Datos
        nuevoProducto().then(data => {
            //console.log(data);
            this.limpiarState();
            // DIRECCIONAR
            this.props.history.push('/productos');
        });
    }

    render(){
        const { nombre, precio, stock } = this.state;
        const input = {
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }
        return (
            <Fragment>
                <h2 className="text-center mb-5">Nuevo Producto</h2>

                <div className="row justify-content-center">
                    
                    <Mutation mutation={NUEVO_PRODUCTO} variables={{input}}>
                    
                    {(nuevoProducto, {loading, error, data}) => {
                        return (
                            <form 
                                onSubmit={ e => this.crearNuevoProducto(e, nuevoProducto)}
                                className="col-md-8">
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre del Producto"
                                        onChange={this.actualizarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input 
                                            type="number" 
                                            name="precio" 
                                            className="form-control" 
                                            placeholder="Precio del Producto"
                                            onChange={this.actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        className="form-control" 
                                        placeholder="stock del Producto" 
                                        onChange={this.actualizarState}
                                    />
                                </div>
                                <button 
                                    disabled={ this.validarForm() }
                                    type="submit" 
                                    className="btn btn-success float-right">
                                        Crear Producto
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

export default NuevoProducto;
