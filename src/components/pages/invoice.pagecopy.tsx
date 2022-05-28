
import { Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getInvoiceList } from '../../actions/invoice.action';

interface InvoicePageProps {
    title: string;
    getInvoiceList: () => void;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'contractName',
        headerName: 'contract Name',
        width: 150,
        editable: true,
    },
    {
        field: 'totalvalue',
        headerName: 'Total Value',
        width: 150,
        editable: true,
    }
];

const rows = [
    { id: 1, contractName: 'abc', totalvalue: 'Jon' },
    { id: 2, contractName: 'abc', totalvalue: 'Cersei' },
    { id: 3, contractName: 'abc', totalvalue: 'Jaime' },
    { id: 4, contractName: 'abc', totalvalue: 'Arya' },
    { id: 5, contractName: 'abc', totalvalue: 'Daenerys' },
    { id: 6, contractName: 'abc', totalvalue: null },
    { id: 7, contractName: 'abc', totalvalue: 'Ferrara' },
    { id: 8, contractName: 'abc', totalvalue: 'Rossini' },
    { id: 9, contractName: 'abc', totalvalue: 'Harvey' }
];


const invoiceListProps = {
    id: "",
    contractName: "",
    totalvalue: 0
}


const groupBy = (items: any, criteria = 'contractName') => {
    var newArray: any = [];
    // groupby Data
    const newObj = items.invoiceList.reduce(function (acc: any, currentValue: any) {
        if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(currentValue);
        return acc;
    }, {});
    // retrun data array Formate
    var id = 1;
    for (var prop in newObj) {
        var totalValue = 0
        newObj[prop].forEach((element: any) => {
            totalValue = totalValue + element.value
        });

        let setValue = {
            id: id,
            contractName: prop,
            totalvalue: totalValue
        }
        newArray.push(setValue);
        id++;
    }

    return newArray;
}



class InvoicePage extends Component<InvoicePageProps>{

    state = {
        invoiceList: [invoiceListProps],
    }

    componentDidMount = async () => {
        await this.props.getInvoiceList();
    }




    static getDerivedStateFromProps(props: any, state: any) {
        const { invoiceList } = props;
        if (invoiceList) {
            return {
                invoiceList: groupBy(invoiceList)
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
                            rows={this.state.invoiceList}
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
        invoiceList: state.invoiceReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getInvoiceList: () => dispatch(getInvoiceList()),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);