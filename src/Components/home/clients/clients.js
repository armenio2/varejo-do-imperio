import React from 'react';
import DataTable from 'react-data-table-component';

import dataMock from '../../../mock/dataMock';

function clients(props) {
    return (
        <section>
            <span style={{ fontSize: '35px', fontWeight: 'bold' }}>{props.clientName}</span>
            <div style={props.stage === 0 ? props.styleShow : props.styleHide}>
                <DataTable
                    noHeader
                    style={props.dataTable}
                    columns={props.columnsClient}
                    data={dataMock.dataClient}
                    onRowClicked={props.onRowClickedClient}
                    highlightOnHover={true}
                />
            </div>
        </section>
    );
}

export default clients;
