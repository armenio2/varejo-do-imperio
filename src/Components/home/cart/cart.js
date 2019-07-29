import React from 'react';
import DataTable from 'react-data-table-component';

function cart(props) {
    return (
        <div style={props.cartItem ? props.styleShow : props.styleHide}>
            <div style={{ marginTop: 35 }} className="row justify-content-center align-items-end">
                <div className="col-12" >
                    <p style={{ fontSize: 25, fontFamily: 'bold' }}>Carrinho de Compras</p>
                    <DataTable
                        noHeader
                        style={props.dataTable}
                        columns={props.columnsCart}
                        data={props.cartItem ? props.cartItem : ''}
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
    );
}

export default cart;
