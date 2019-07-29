import React from 'react';
import DataTable from 'react-data-table-component';
import dataMock from '../../../mock/dataMock';

function products(props) {
    return (
        <div style={props.stage === 1 ? props.styleShow : props.styleHide}>
            <DataTable
                noHeader
                style={props.dataTable}
                columns={props.columnsProduct}
                data={dataMock.dataProduct}
                onRowClicked={props.onRowClickedProduct}
                highlightOnHover={true}
            />
        </div>
    );
}

export default products;
