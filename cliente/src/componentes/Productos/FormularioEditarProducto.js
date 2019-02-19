import React, { Component } from 'react';
import {ACTUALIZAR_PRODUCTO} from '../../mutations';
// Mutation solo se usa para: Crear/Eliminar/Actualizar registros
import { Mutation } from 'react-apollo';
// para direccionar
import { withRouter } from 'react-router-dom';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class FormularioEditarProducto extends Component {
    state = {
        ...this.props.producto.obtenerProducto
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

    editarProductoForm = (e, actualizarProducto) => {
        e.preventDefault();

        actualizarProducto().then(data =>{
            //console.log(data);
            // Limpiar el state, dejarlo totalmente limpio, en caso de editar y volver a regresar
            this.setState({
                ...initialState
            })
        })
    }

    render() { 
        const { nombre, precio, stock } = this.state;
        const {id} = this.props;
        
        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }

        return (
            <Mutation
                mutation={ACTUALIZAR_PRODUCTO}
                variables={{input}}
                key={this.props.id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/productos');
                })}
            >
            {( actualizarProducto, {loading, error, data}) => {
                return(
                    <form 
                        onSubmit={ e => this.editarProductoForm(e, actualizarProducto)}
                        className="col-md-8" >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                value={nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={this.actualizarState}
                                    type="number" 
                                    name="precio" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    value={precio}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="stock del Producto" 
                                value={stock}
                                />
                        </div>
                        <button 
                            disabled={ this.validarForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form>                
                )
            }}
            </Mutation>
        );
    }
}
 

export default withRouter(FormularioEditarProducto);
