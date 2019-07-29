import React from 'react';
import DataTable from 'react-data-table-component';

import dataMock from '../../../mock/dataMock';

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

function clients(props) {
    return (
        <section>
            <span style={{ fontSize: '35px', fontWeight: 'bold' }}>{props.clientName}</span>
            <div style={props.stage === 0 ? props.styleShow : props.styleHide}>
                <DataTable
                    noHeader
                    style={props.dataTable}
                    columns={columnsClient}
                    data={dataMock.dataClient}
                    onRowClicked={props.onRowClickedClient}
                    highlightOnHover={true}
                />
            </div>
        </section>
    );
}

export default clients;
