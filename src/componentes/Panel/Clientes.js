import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../queries';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const datos = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const Clientes = () => {
    return ( 
        <Query query={TOP_CLIENTES} pollInterval={1000}>
            {({loading, error, data, startPolling, stopPolling}) => {
                if(loading) return 'Cargando...';
                if(error) return `${error.message}`;

                const topClientesGrafica = [];

                data.topClientes.map((pedido, index) => {
                    topClientesGrafica[index] = {
                        total: pedido.total,
                        ...pedido.cliente[0]
                    }
                })

                return(
                    <BarChart width={600} height={300} data={topClientesGrafica}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="nombre"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                );
            }}
        </Query>
    );
}
 
export default Clientes;