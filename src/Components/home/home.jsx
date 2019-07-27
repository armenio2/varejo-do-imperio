import React from 'react';
import DataTable from 'react-data-table-component';

const data = [
    { id: 1, name: 'Darth Vader' },
    { id: 2, name: 'Obi-Wan Kenobi' },
    { id: 3, name: 'Luke Skywalker' },
    { id: 4, name: 'Imperador Palpatine' },
    { id: 5, name: 'Han Solo' }
];
const columns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        right: true,
        cell: data => <div style={{ fontWeight: 'bold' }}>{data.name}</div>,
    },
];


function Home() {

    const onRowClicked = () => {
        console.log("this row clicked" , data)
    }
    return (
        <div style={styles} class="container">
            <div class="row justify-content-center">
                <div class="col-12 align-self-center ">
                    <DataTable
                        style={dataTable}
                        columns={columns}
                        data={data}
                        onRowClicked={onRowClicked}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    height: '100vh',
    width: '100vh',
}

const dataTable = {
    border: 'black 1px solid',
    boxShadow: '1px 1px'
}

export default Home;
