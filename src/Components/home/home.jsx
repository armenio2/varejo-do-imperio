import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from './modal/modal';

import dataMock from '../../mock/dataMock';

var currencyFormatter = require('currency-formatter');

const columnsClient = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        cell: data => <div style={{ fontWeight: 'bold' }}>{data.name}</div>,
    },
];

const columnsProduct = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        cell: data => <div style={{ fontWeight: 'bold' }}>{data.name}</div>,
    },
    {
        name: 'Preço Unitário (R$)',
        selector: 'price',
        right: true,
        sortable: true,
        cell: data => currencyFormatter.format(parseInt(data.price) / 100, { code: 'USD', thousand: '.', decimal: ',', "symbol": "R$", "decimalDigits": 2 })
    },
    {
        name: 'Múltiplo',
        selector: 'minToSell',
        right: true,
        sortable: true,
    },
];

const columnsCart = [
    {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        cell: data => <div style={{ fontWeight: 'bold' }}>{data.name}</div>,
    },
    {
        name: 'Preço Unitário (R$)',
        selector: 'price',
        right: true,
        sortable: true,
        cell: data => currencyFormatter.format(parseInt(data.price) / 100, { code: 'USD', thousand: '.', decimal: ',', "symbol": "R$", "decimalDigits": 2 })
    },
    {
        name: 'Preço Final',
        selector: 'itemValueToSell',
        right: true,
        sortable: true,
        cell: data => currencyFormatter.format(parseInt(data.itemValueToSell) / 100, { code: 'USD', thousand: '.', decimal: ',', "symbol": "R$", "decimalDigits": 2 })
    },
    {
        name: 'Quantidade',
        selector: 'itemAmount',
        right: true,
        sortable: true,
        cell: data => currencyFormatter.format(parseInt(data.itemAmount), { thousand: '.', decimal: ',' })
    },
    {
        name: 'Rentabilidade',
        right: true,
        sortable: true,
        cell: data => <div style={{ fontWeight: 'bold' }}>{calculateRetability(data)}</div>,
    },

];

const calculateRetability = (data) => {
    if (parseInt(data.itemValueToSell) > parseInt(data.price)) {
        return 'Otima';
    } else if (parseInt(data.itemValueToSell) >= (parseInt(data.price) * 0.9)) {
        return 'Boa';
    }
    return 'Ruim';
}

const Home = () => {
    const [clientName, client] = useState('Clientes');
    const [stage, step] = useState(0);
    const [item, nextItem] = useState(0);
    const [value, nextValue] = useState();
    const [amount, nextAmount] = useState();
    const [cartItem, addCartItem] = useState();
    const [isValid, changeValid] = useState(true);

    const onRowClickedClient = (props) => {
        client(props.name)
        step(1)
    }

    const onRowClickedProduct = (props) => {
        cleanInputs()
        step(2)
        nextItem(props)
    }

    const onModalClose = () => {
        step(1)
    }

    const submitIsValid = (props, quantity) => {
        if (parseInt(props.minToSell) >= 1) {
            const rest = parseInt(quantity) % parseInt(props.minToSell);
            if (rest === 0) {
                changeValid(true)
                return true
            } else {
                changeValid(false)
                return false
            }
        } else {
            changeValid(true)
            return true
        }
    }

    const cleanInputs = () => {
        nextAmount('')
        nextValue('')
    }

    const onModalSubmit = () => {
        if (submitIsValid(item, amount)) {
            step(1)
            if (cartItem) {
                let cart = [
                    ...cartItem,
                    {
                        ...item,
                        'itemValueToSell': value,
                        'itemAmount': amount,
                    },
                ]
                addCartItem(cart)
            } else {
                let cart = [
                    {
                        ...item,
                        'itemValueToSell': value,
                        'itemAmount': amount,
                    },
                ]
                addCartItem(cart)
            }
        }
    }

    return (
        <div className="container" style={{ height: '100vh', width: '100vh' }}>
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="col-8" >
                    <span style={{ fontSize: '35px', fontWeight: 'bold' }}>{clientName}</span>
                    <div style={stage === 0 ? styleShow : styleHide}>
                        <DataTable
                            noHeader
                            style={dataTable}
                            columns={columnsClient}
                            data={dataMock.dataClient}
                            onRowClicked={onRowClickedClient}
                            highlightOnHover={true}
                        />
                    </div>
                    <div style={stage === 1 ? styleShow : styleHide}>
                        <DataTable
                            noHeader
                            style={dataTable}
                            columns={columnsProduct}
                            data={dataMock.dataProduct}
                            onRowClicked={onRowClickedProduct}
                            highlightOnHover={true}
                        />
                    </div>
                    <div style={stage === 2 ? styleShow : styleHide} className="modal" tabIndex="-1" role="dialog">
                        <Modal
                            name={item.name}
                            value={value}
                            nextValue={nextValue}
                            amount={amount}
                            nextAmount={nextAmount}
                            isValid={isValid}
                            styleHide={styleHide}
                            styleShow={styleShow}
                            minToSell={item.minToSell}
                            onModalClose={onModalClose}
                            onModalSubmit={onModalSubmit}
                        />
                    </div>
                </div>
                <div style={cartItem ? styleShow : styleHide}>
                    <div style={{ marginTop: 35 }} className="row justify-content-center align-items-end">
                        <div className="col-12" >
                            <p style={{ fontSize: 25, fontFamily: 'bold' }}>Carrinho de Compras</p>
                            <DataTable
                                noHeader
                                style={dataTable}
                                columns={columnsCart}
                                data={cartItem ? cartItem : ''}
                                onRowClicked={onRowClickedProduct}
                                highlightOnHover={true}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: 35 }} className="row justify-content-center align-items-end">
                        <div className="col-12" >
                            <button type="button" className="btn btn-primary">Finalizar Compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

const dataTable = {
    border: 'black 1px solid',
    boxShadow: '1px 1px'
}

const styleHide = {
    display: 'none'
}

const styleShow = {
    display: 'initial'
}

export default Home;
