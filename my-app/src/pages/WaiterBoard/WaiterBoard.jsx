import React from 'react';

import Header from '../../components/Header/Header';

import './WaiterBoard.css';

const WaiterBoard = () => {
    return (
        <div>
            <Header />
            <h1>PEDIDOS</h1>
            <div className="container">
                <a href="/NewOrder" className="button bgGreen white">PEDIDO NUEVO</a>
                <a href="/OrdersToDeliver" className="button bgGreen white">PEDIDOS LISTOS</a>
            </div>
        </div>
    );
};

export default WaiterBoard;