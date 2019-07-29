import React from 'react';
import DataTable from 'react-data-table-component';

var currencyFormatter = require('currency-formatter');

const columnsCart = [
    {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        cell: data => <div style={titleCartFont}>{data.name}</div>,
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
        cell: data => calculateRetability(data),
    },
];

const calculateRetability = (data) => {
    if (parseInt(data.itemValueToSell) > parseInt(data.price)) {
        return <div style={titleGreat}>Otima</div>;
    } else if ((parseInt(data.itemValueToSell) * 100) >= (parseInt(data.price) * 0.9)) {
        return <div style={titleGood}>Boa</div>;
    }
    return <div style={titleBad}>Ruim</div>;
}

function cart(props) {
    return (
        <div style={props.cartItem ? props.styleShow : props.styleHide}>
            <div style={marginTop} className="row justify-content-center align-items-end">
                <div className="col-12" >
                    <p style={titleFont}>Carrinho de Compras</p>
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
    fontSize: 25,
    fontWeight: 'bold'
}

const titleCartFont = {
    fontWeight: 'bold'
}

const marginTop = {
    marginTop: 35
}

const titleGreat = {
    fontWeight: 'bold',
    color: '#74FF16'
}

const titleGood = {
    fontWeight: 'bold',
    color: '#FFF962',
}

const titleBad = {
    fontWeight: 'bold',
    color: '#FF4136'
}

export default cart;
