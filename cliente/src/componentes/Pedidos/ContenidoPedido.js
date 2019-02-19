import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';

import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';

import Error from '../Alertas/Error';
// Esto es 1 propiedad con sus opciones

/*const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]*/

class ContenidoPedido extends Component {
    state = { 
        productos: [],
        total: 0
     }

    seleccionarProducto = (productos) => {

        if(productos.length === 0){
            this.setState({
                total: 0
            });
        }
        
        this.setState({
            productos
        })
        //console.log(`Algo paso con`, productos);
    }

    actualizarTotal = () => {
        // leer el state de productos
        const productos = this.state.productos;

        // cuando todos los productos están en 0
        if(productos.length === 0){
            this.setState({
                total: 0
            });
            return;
        }

        let nuevoTotal = 0;
        
        // realizar la operacion de cantidad x precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal
        });
        
    }

    actualizarCantidad = (cantidad, index) => {
        // leer el state de productos
        const productos = this.state.productos;

        // actualizar la cantidad de productos

        // se pasa a Number porque cantidad viene string, agregar la cantidad desde la Interfaz
        productos[index].cantidad = Number(cantidad);

        //validamos
        
        // agregamos al state
        // ademas se usa un Callback para Actualizar el Total
        this.setState({
            productos
        }, () => {
            this.actualizarTotal();
        })
    }

    eliminarProducto = (id) => {
        //console.log(id);
        const productos = this.state.productos;
        // filter me va a permitir traer 1 producto en especifico o todos
        // y es una funcion muy util, en react se usa mucho
        const productosRestantes = productos.filter(producto => producto.id !== id);

        // Con esto elimina el producto del state
        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        })
    }

    render() {
        const mensaje = (this.state.total < 0) ? <Error error="Las cantidades no pueden ser negativas"/> : '';
        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                
                {mensaje}

                <Select 
                onChange={this.seleccionarProducto}
                options={this.props.productos}
                isMulti={true}
                components={Animated()}
                placeholder={'Seleccionar Productos'}
                getOptionValue = {(options) => options.id}
                getOptionLabel = {(options) => options.nombre}
                value={this.state.productos}
                />
                <Resumen 
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto} />
                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
                <GenerarPedido 
                    productos={this.state.productos} 
                    total={this.state.total} 
                    ClienteID={this.props.id}
                    idVendedor={this.props.idVendedor}
                    />
            </Fragment>
        );
    }
}

export default ContenidoPedido;