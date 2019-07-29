import React from 'react';
import DataTable from 'react-data-table-component';

var currencyFormatter = require('currency-formatter');

const columnsCart = [
    {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        cell: data => <div style={titleFont}>{data.name}</div>,
    },
    {
        name: 'Preço Unitário (R$)',
        selector: 'price',
        right: true,
        sortable: true,
        cell: data => currencyFormatter.format(parseInt(data.price) / 100, { thousand: '.', decimal: ',', "symbol": "R$", "decimalDigits": 2 })
    },
    {
        name: 'Valor de venda',
        selector: 'itemValueToSell',
        right: true,
        sortable: true,
        cell: data => currencyFormatter.format(parseInt(data.itemValueToSell), { thousand: '.', decimal: ',', "symbol": "R$", "decimalDigits": 2 })
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
        cell: data => <div style={titleFont}>{calculateRetability(data)}</div>,
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

function cart(props) {
    return (
        <div style={props.cartItem ? props.styleShow : props.styleHide}>
            <div style={marginTop} className="row justify-content-center align-items-end">
                <div className="col-12" >
                    <p style={{ fontSize: 25, fontFamily: 'bold' }}>Carrinho de Compras</p>
                    <DataTable
                        noHeader
                        style={props.dataTable}
                        columns={columnsCart}
                        data={props.cartItem ? props.cartItem : ''}
                        highlightOnHover={true}
                    />
                </div>
            </div>
            <div style={marginTop} className="row justify-content-center align-items-end">
                <div className="col-12" >
                    <button type="button" className="btn btn-primary">Finalizar Compra</button>
                </div>
            </div>
        </div>
    );
}

const titleFont = {
    fontWeight: 'bold'
}

const marginTop = {
    marginTop: 35
}

export default cart;
