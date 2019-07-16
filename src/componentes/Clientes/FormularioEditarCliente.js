import React, { Component } from 'react';
import {ACTUALIZAR_CLIENTE} from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormularioEditarCliente extends Component {

    state =  {
        cliente: this.props.cliente,
        emails: this.props.cliente.emails
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email:''}])
        })
    }

    leerCampo = i => e => {
        const nuevoMail = this.state.emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        this.setState({ emails: nuevoMail });
    }

    quitarCampo = i => () => {
        this.setState({
            emails: this.state.emails.filter((s, index) => i !== index)
        });
    }



    render() { 

            const {nombre,apellido, empresa, edad, tipo } = this.state.cliente;

            const {emails} = this.state;
           
            return (

                <Mutation mutation={ACTUALIZAR_CLIENTE}
                onCompleted={ () => this.props.refetch().then(() =>{
                    this.props.history.push('/clientes')
                })}
                >

                    {actualizarCliente => (
        
                   <form className="col-md-8 m-3" onSubmit={e => {
                       e.preventDefault();

                       const { nombre, apellido, empresa, edad, tipo} = this.state.cliente;

                       const { emails } = this.state;

                       const input = {
                            id: this.props.id, 
                            nombre,
                            apellido,
                            empresa,
                            edad: Number(edad),
                            tipo,
                            emails
                       } 
                       
                       actualizarCliente({
                           variables: {input} 
                       }) 
                   }}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre</label>
                                    <input
                                    onChange={e => {
                                        this.setState({
                                           cliente: {
                                               ...this.state.cliente,
                                               nombre: e.target.value
                                           } 
                                        })
                                    }}
                                        defaultValue={nombre}
                                        type="text" 
                                        className="form-control" 
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellido</label>
                                    <input 
                                        onChange={e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    apellido: e.target.value
                                                }
                                            })
                                        }}
                                        defaultValue={apellido}
                                        type="text" 
                                        className="form-control" 
                                     />
                                </div>
                            </div>
                          
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Empresa</label>
                                    <input
                                        onChange={e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    empresa: e.target.value
                                                }
                                            })
                                        }}
                                        defaultValue={empresa}
                                        type="text" 
                                        className="form-control" 
                                    />
                                </div>

                                {emails.map((input, index) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label>Email {index + 1} : </label>
                                        <div className="input-group">
                                        
                                            <input 
                                                type="email"
                                                placeholder={`Email`}
                                                className="form-control" 
                                                onChange={this.leerCampo(index)}
                                                defaultValue={input.email}
                                            />
                                            <div className="input-group-append">
                                                <button 
                                                    className="btn btn-danger" 
                                                    type="button" 
                                                    onClick={this.quitarCampo(index)}> 
                                                    &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button 
                                        onClick={this.nuevoCampo}
                                        type="button" 
                                        className="btn btn-warning"
                                    >+ Agregar Email</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input
                                        onChange={e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    edad: e.target.value
                                                }
                                            })
                                        }}
                                        defaultValue={edad}
                                        type="text" 
                                        className="form-control" 
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>  
                                    <select 
                                        value={tipo}
                                        onChange={e =>{ 
                                            this.setState({
                                                ...this.state.cliente,
                                                tipo: e.target.value
                                            })
                                        }}
                                        className="form-control"
                                    >
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                        </form>
                    )}
                        </Mutation>
            )      
    }
}

export default withRouter(FormularioEditarCliente);