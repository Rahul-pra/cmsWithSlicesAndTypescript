
import { Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getContractList } from "../../actions/contarct.action"

interface ContractPageProps {
    title: string;
    getContractList: () => void
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'contractName',
        headerName: 'Contract Name',
        width: 150,
        editable: true,
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 150,
        editable: true,
    },
    {
        field: 'endDate',
        headerName: 'End Date',
        type: 'number',
        width: 110,
        editable: true,
    }
];

const rows = [
    { id: 1, startDate: '08/12/2021', contractName: 'Jon', endDate: '08/12/2021' },
    { id: 2, startDate: '08/12/2021', contractName: 'Cersei', endDate: '08/12/2021' },
    { id: 3, startDate: '08/12/2021', contractName: 'Jaime', endDate: '08/12/2021' },
    { id: 4, startDate: '08/12/2021', contractName: 'Arya', endDate: '08/12/2021' },
    { id: 5, startDate: '08/12/2021', contractName: 'Daenerys', endDate: '08/12/2021' },
    { id: 6, startDate: '08/12/2021', contractName: null, endDate: '08/12/2021' },
    { id: 7, startDate: '08/12/2021', contractName: 'Ferrara', endDate: '08/12/2021' },
    { id: 8, startDate: '08/12/2021', contractName: 'Rossini', endDate: '08/12/2021' },
    { id: 9, startDate: '08/12/2021', contractName: 'Harvey', endDate: '08/12/2021' },
];

class ContractPage extends Component<ContractPageProps>{

    state = {
        contractList: rows
    }

    componentDidMount() {
        this.props.getContractList();
    }

    static getDerivedStateFromProps(props: any, state: any) {
        const { contractList } = props;
        if (contractList) {
            return {
                contractList: contractList.contractList
            }
        }
        return {}
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <Container maxWidth="xl">
                    <h3>{title}</h3>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={this.state.contractList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </Container>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        contractList: state.contractReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getContractList: () => dispatch(getContractList())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ContractPage);