import React, { Component,Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';


class ContenidoPedido extends Component {

    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        this.setState({
            productos
        })
    }

    actualizarTotal = () => {

        // leer el state de productos
        const productos = this.state.productos;

        // cuando todos los productos estan en 0
        if(productos.length === 0) {
            this.setState({
                total: 0
            });
            return;
        }

        let nuevoTotal = 0;
        

        // realizar operacion cantidad por precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal
        });
    }

    actualizarCantidad = (cantidad, index) => {
        // console.log(cantidad);


        // leer el state de productos
        const productos = this.state.productos;

        // Actualizar la cantidad de productos
        productos[index].cantidad = Number(cantidad)

        // validar

        // Agregar al state

        this.setState({
            productos
        }, () => {
            this.actualizarTotal();
        })
    }

    eliminarProducto = (id) => {
        const productos = this.state.productos;

        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        });
    }

    render() { 
        return ( 

            <Fragment>
                <h2 className="text-center mb-5">Seleccionar articulos</h2>
                <Select
                    onChange={this.seleccionarProducto}
                    options={this.props.productos} 
                    isMulti={true}
                    components={makeAnimated()}
                    placeholder={'Seleccionar productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />

                <Resumen 
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />

                <p className="font-weigth-bold float-right mt-3">
                    Total: <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
            </Fragment>
        );
    }
}
 
export default ContenidoPedido;