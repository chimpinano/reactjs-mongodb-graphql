import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { TOP_VENDEDORES } from '../../queries';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const Vendedores = () => {
    return (
        <Fragment>
            <Query query={TOP_VENDEDORES}>
                {({loading, error, data}) => {
                    if(loading) return 'Cargando...';
                    if(error) return `Error ${error.message}`;

                    //console.log(data);

                    const topVendoresGrafica = []
                    // se aplica 1 distrochorin usando el spread operator 
                    // para que traiga una copia (...pedido) de pedido.cliente
                    data.topVendedores.map((vendedor, index) => {
                        return (
                            topVendoresGrafica[index] = {
                                ...vendedor.vendedor[0],
                                total: vendedor.total
                            }
                        )
                    })
                    //console.log(topVendoresGrafica)
                    return (
                        <BarChart width={900} height={300} data={topVendoresGrafica}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="nombre"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="total" fill="#6148b9" />
                        </BarChart>
                    )
                }}
            </Query>
        </Fragment>
    );
}

export default Vendedores;
