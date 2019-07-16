import React, { Component }from 'react';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE }  from '../../mutations';
import { Link } from 'react-router-dom';
import Paginador from '../Paginador';
import Exito from '../Alertas/Exito';

class Clientes extends Component{

    limite = 10;

    state = {
        paginador: {
            offset: 0,
            actual: 1
        },
        alerta: {
            mostrar: false,
            mensaje: ''
        }
    }

    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        });
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        });
    }

    render() {

        const {alerta: {mostrar, mensaje} } = this.state;

        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        return(
            <Query query={CLIENTES_QUERY} pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return "Cargando...";
                    if(error) return `Error: ${error.message}`;
                    console.log(data)
            
                    return (
                        <React.Fragment>
                            <h2 className="text-center">Listado Clientes</h2>

                            {alerta}
            
                            <ul className="list-group mt-4">
                                {data.getClientes.map(item => {
                                    const {id} = item;
            
                                    return(
                                        <li key={item.id} className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                    {item.nombre} {item.apellido} - {item.empresa}
                                                </div>
                                                <div className="col-md-4 d-flex justify-content-end">
                                                    <Mutation 
                                                        mutation={ELIMINAR_CLIENTE}
                                                        onCompleted={(data) => {
                                                            this.setState({
                                                                alerta: {
                                                                    mostrar: true,
                                                                    mensaje: data.eliminarCliente
                                                                }
                                                            }, () => {
                                                                setTimeout(() => {
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: false,
                                                                            mensaje: ''
                                                                        }
                                                                    })
                                                                }, 3000)
                                                            })
                                                        }}
                                                    >
                                                        {eliminarCliente => (
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                                                onClick={ () => {
                                                                    if(window.confirm('Seguro que deseas elimnar este cliente?')){
                                                                        eliminarCliente({
                                                                            variables: {id}
                                                                        })
                                                                    }
                                                                }}
                                                            >
                                                            &times; Eliminar
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                    <Link to={`/clientes/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                                        Editar cliente
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            <Paginador
                            actual={this.state.paginador.actual}
                            total={data.totalClientes}
                            limite={this.limite}
                            paginaAnterior={this.paginaAnterior}
                            paginaSiguiente={this.paginaSiguiente}
                            />
                        </React.Fragment>
                    );
                }}
            
            </Query>
        )

    }
}


export default Clientes;