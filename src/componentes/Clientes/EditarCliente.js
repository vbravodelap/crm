import React, { Component, Fragment } from 'react';
import { CLIENTE_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import FormularioEditarCliente from './FormularioEditarCliente';
class EditarCliente extends Component {

    render(){

        const{ id } = this.props.match.params;

        
        return(

            <Fragment>
                <h1 className="text-center">Editar Cliente</h1>

                <div className="row justify-content-center">

                    <Query query={CLIENTE_QUERY} variables={{id}}>
                        {({loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';;
                            if(error) return `Error! ${error.message}`;
                            console.log(data)
                            return (
                                <FormularioEditarCliente
                                cliente ={data.getCliente}
                                id={id}
                                refetch={refetch}
                                />
                            );
                        }}

                    </Query>

                </div>

            </Fragment>

        )
    }
        
}

export default EditarCliente;