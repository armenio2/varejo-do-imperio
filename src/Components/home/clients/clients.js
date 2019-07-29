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
        cell: data => <div style={titleFont}>{data.name}</div>,
    },
];

function clients(props) {
    return (
        <section>
            <span style={titleClientFont}>{props.clientName}</span>
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

const titleFont = {
    fontWeight: 'bold'
}

const titleClientFont = {
    fontWeight: 'bold',
    fontSize: 35
}

export default clients;
