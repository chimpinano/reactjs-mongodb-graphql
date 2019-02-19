import React, { Fragment } from 'react';
import Clientes from './Clientes';
import Vendedores from './Vendedores';

const Panel = () => {
    return (
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
            <Clientes />
            <h1 className="text-center my-5">Top 10 Vendedores</h1>
            <Vendedores />
        </Fragment>
    );
}

export default Panel;
