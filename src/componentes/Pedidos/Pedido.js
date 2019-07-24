import React from 'react';
import { OBTENER_PRODUCTO } from '../../queries';
import { Query } from 'react-apollo';
import ResumenProducto from './ResumenProducto';

const Pedido = (props) => {

    const { pedido } = props;
    const { id } = pedido;
    const fecha = new Date(Number(pedido.fecha));

    return (
        <div className="col-md-4">
            <div className={`card mb-3`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <select 
                            className="form-control my-3"
                            value={pedido.estado}
                            onChange={e => {
                                const input = {
                                    id,
                                    pedido: pedido.pedido,
                                    fecha: pedido.fecha,
                                    total: pedido.total,
                                    cliente: props.cliente,
                                    estado: e.target.value
                                }

                            }}
                        >
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="COMPLETADO">COMPLETADO</option>
                            <option value="CANCELADO">CANCELADO</option>
                        </select>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> {fecha.toLocaleString("es-MX")}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal"> $ {pedido.total}</span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto, index) => {

                        const {id} = producto;
                        return(
                            <Query key={pedido.id+index} query={OBTENER_PRODUCTO} variables={{id}}>
                                {({loading, error, data}) => {
                                    if(loading) return 'Cargando...';
                                    if(error) return `Error: ${error.message}`;

                                    return(
                                        <ResumenProducto
                                            producto={data.obtenerProducto}
                                            cantidad={producto.cantidad}
                                            key={producto.id}
                                        />
                                    )
                                }}
                            </Query>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}
 
export default Pedido;