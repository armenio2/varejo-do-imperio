import React from 'react';
import DataTable from 'react-data-table-component';
import dataMock from '../../../mock/dataMock';

var currencyFormatter = require('currency-formatter');

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

function products(props) {
    return (
        <div style={props.stage === 1 ? props.styleShow : props.styleHide}>
            <DataTable
                noHeader
                style={props.dataTable}
                columns={columnsProduct}
                data={dataMock.dataProduct}
                onRowClicked={props.onRowClickedProduct}
                highlightOnHover={true}
            />
        </div>
    );
}

export default products;
