import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const dataClient = [
    { id: 1, name: 'Darth Vader' },
    { id: 2, name: 'Obi-Wan Kenobi' },
    { id: 3, name: 'Luke Skywalker' },
    { id: 4, name: 'Imperador Palpatine' },
    { id: 5, name: 'Han Solo' }
];
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

const dataProduct = [
    { id: 1, name: 'Millenium Falcon', price: '55000000', minToSell: '' },
    { id: 2, name: 'X-Wing', price: '6000000', minToSell: '2' },
    { id: 3, name: 'Super Star Destroyer', price: '457000000', minToSell: '' },
    { id: 4, name: 'TIE Fighter', price: '7500000', minToSell: '2' },
    { id: 5, name: 'Lightsaber', price: '600000', minToSell: '5' },
    { id: 6, name: 'DLT-19 Heavy Blaster Rifle', price: '580000', minToSell: '' },
    { id: 7, name: 'DL-44 Heavy Blaster Pistol', price: '150000', minToSell: '10' }
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
    },
    {
        name: 'Múltiplo',
        selector: 'minToSell',
        right: true,
        sortable: true,
    },
];

const columnsCart = [
    /* {
         name: 'Id',
         selector: 'id',
         sortable: true,
     },*/
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
    },
    {
        name: 'Preço Final',
        selector: 'itemValue',
        right: true,
        sortable: true,
    },
    {
        name: 'Quantidade',
        selector: 'itemAmount',
        right: true,
        sortable: true,
    },
    {
        name: 'Rentabilidade',
        //selector: 'itemAmount',
        right: true,
        sortable: true,
        cell: data => <div style={{ fontWeight: 'bold' }}>Hakuna Matata</div>,
    },

];

const Home = () => {
    const [clientName, client] = useState('Clientes');
    const [stage, step] = useState(0);
    const [item, nextItem] = useState(0);
    const [value, nextValue] = useState();
    const [amount, nextAmount] = useState();
    const [cartItem, addCartItem] = useState();

    const onRowClickedClient = (props) => {
        client(props.name)
        step(1)
        console.log("this row clicked", props)
    }

    const onRowClickedProduct = (props) => {
        console.log("cartItem ", cartItem)
        step(2)
        nextItem(props)
        //tellmePrice()
        console.log("this row clicked", props)
    }

    const onModalClose = (props) => {
        step(1)
        //nextItem('')
        console.log("this row clicked", props)
    }

    const onModalSubmit = () => {
        step(1)
        if (cartItem) {
            let cart = [
                ...cartItem,
                {
                    ...item,
                    'itemValue': value,
                    'itemAmount': amount,
                },
            ]
            addCartItem(cart)
        } else {
            let cart = [
                {
                    ...item,
                    'itemValue': value,
                    'itemAmount': amount,
                },
            ]
            addCartItem(cart)
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
                            data={dataClient}
                            onRowClicked={onRowClickedClient}
                            highlightOnHover={true}
                        />
                    </div>
                    <div style={stage === 1 ? styleShow : styleHide}>
                        <DataTable
                            noHeader
                            style={dataTable}
                            columns={columnsProduct}
                            data={dataProduct}
                            onRowClicked={onRowClickedProduct}
                            highlightOnHover={true}
                        />
                    </div>
                    <div style={stage === 2 ? styleShow : styleHide} className="modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{item.name}</h5>
                                    <button onClick={onModalClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-8" >
                                            <p>Qual o valor de compra do item?</p>
                                        </div>
                                        <div className="col-4" >
                                            <input value={value} onChange={e => nextValue(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ></input>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-8" >
                                            <p>Quantos itens?</p>
                                        </div>
                                        <div className="col-4" >
                                            <input value={amount} onChange={e => nextAmount(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={onModalClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onClick={onModalSubmit} type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
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
