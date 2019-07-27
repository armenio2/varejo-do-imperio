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

function Home() {
    const [clientName, client] = useState('Clientes');
    const [stage, step] = useState(0);

    const onRowClickedClient = (props) => {
        client(props.name)
        step(1)
        console.log("this row clicked", props)
    }

    const onRowClickedProduct = (props) => {
        console.log("this row clicked", props)
    }

    return (
        <div className="container" style={{ height: '100vh', width: '100vh' }}>
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="col-8" >
                    <span style={{ fontSize: '35px', fontFamily: 'bold' }}>{clientName}</span>
                    <div style={stage === 0 ? styleShow : styleHide}>

                        <DataTable
                            style={styleShow}
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
                </div>
            </div>
        </div>
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
