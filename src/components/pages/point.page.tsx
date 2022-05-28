import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { getContractList } from "../../actions/contarct.action";
// import { getPointList, addPoint, pointModel } from "../../actions/point.action"
import { pointModel } from "../../actions/point.action"

// import { getPointList, addPoint } from "../../reducers/point.slice";
import {
    retrievePoints,
    createPoints,

} from "../../reducers/point.slice";


interface PointPageProps {
    title: string;
}

interface PointPageState {
    contractId: number,
    isPointDisplayed: boolean,
    contractList: any[],
    pointList: any[],
    fields: any,
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'pointName',
        headerName: 'Point Name',
        width: 150,
        editable: true,
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 150,
        editable: true,
    },
    {
        field: 'contractName',
        headerName: 'Contract Name',
        width: 150,
        editable: true,
    }
];

// const rows = [
//     { id: 1, pointName: 'abc', value: 1 },
//     { id: 2, pointName: 'abc', value: 2 },
//     { id: 3, pointName: 'abc', value: 3 },
//     { id: 4, pointName: 'abc', value: 4 },
//     { id: 5, pointName: 'abc', value: 5 },
//     { id: 6, pointName: 'abc', value: null },
//     { id: 7, pointName: 'abc', value: 7 },
//     { id: 8, pointName: 'abc', value: 8 },
//     { id: 9, pointName: 'abc', value: 9 }
// ];

// const contractListProps = {
//     id: "",
//     contractName: ""
// }

const pointListProps = {
    id: 0,
    pointName: "",
    value: 0,
    contractName: ""
}

const mapStateToProps = (state: any) => {

    console.log("state 12444==>", state)
    return {
        contractList: state.contractReducer,
        // pointList: state.pointReducer
        pointList: state.pointSlice
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getContractList: () => dispatch(getContractList()),
        getPointList: () => dispatch(retrievePoints()),
        addPoint: (setPoint: pointModel) => dispatch(createPoints(setPoint))
    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PointPageReduxProps = PropsFromRedux & PointPageProps;


class PointPage extends Component<PointPageReduxProps, PointPageState>{

    constructor(props: any) {
        super(props);
        this.state = {
            contractId: 0,
            isPointDisplayed: false,
            contractList: this.props.contractList.contractList,
            pointList: Array.isArray(this.props.pointList.pointList) ? this.props.pointList.pointList : [],
            fields: pointListProps
        };
    }


    componentDidMount = async () => {
        console.log("this.props ==>", this.props)
        if (this.state.contractList.length === 0) {
            await this.props.getContractList();
        }

        if (this.state.pointList.length === 0) {
            await this.props.getPointList();
        }

    }


    static getDerivedStateFromProps(props: any, state: any) {
        const { contractList, pointList } = props;
        if (contractList && pointList) {
            return {
                contractList: contractList.contractList,
                pointList: pointList.pointList
            }
        }
        return {}
    }

    handleChange = (field: any, e: any) => {
        let fields = this.state.fields;
        if (field === "pointName") {
            fields.pointName = e.target.value;
        } else if (field === "value") {
            fields.value = e.target.value;
        }
        // fields[field] = e.target.value;
        this.setState({ fields });
    }




    render() {
        const { title } = this.props;

        const handleChange = (event: SelectChangeEvent) => {
            //setAge(event.target.value);
            this.setState({ contractId: parseInt(event.target.value) })
        };
        const addButton = () => {
            if (this.state.contractId > 0) {
                this.setState({ isPointDisplayed: true })
            } else {
                this.setState({ isPointDisplayed: false })
            }
        }

        const saveButton = async () => {
            let contractNameFind = this.state.contractList.find(o => o.id === this.state.contractId);
            await this.setState({ fields: { ...this.state.fields, id: this.state.pointList.length + 1, contractName: contractNameFind?.contractName, value: parseInt(this.state.fields.value.toString()) } })

            await this.props.addPoint(this.state.fields)
            await this.setState({
                isPointDisplayed: false,
                fields: {
                    id: 0,
                    pointName: "",
                    value: 0,
                    contractName: ""
                },
                contractId: 0
            })

        }


        return (
            <>
                <Container maxWidth="xl">
                    <h3>{title}</h3>
                    <div>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Contract name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={this.state.contractId.toString()}
                                        onChange={handleChange}
                                        autoWidth
                                        label="contract name"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {!!this.state.contractList && this.state.contractList !== null && this.state.contractList.map((data) => {
                                            return (<MenuItem key={data.id} value={data.id}> {data.contractName}</MenuItem>)
                                        })}
                                        {/* <MenuItem value={10}>Twenty</MenuItem>
                                        <MenuItem value={21}>Twenty one</MenuItem>
                                        <MenuItem value={22}>Twenty one and a half</MenuItem> */}
                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={addButton} style={{ marginTop: '10px' }}>Add</Button>
                            </Grid>
                        </Grid>
                        {this.state.isPointDisplayed ? (
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField id="outlined-basic-1" label="Point Name" name="pointName" type="text" variant="outlined" onChange={this.handleChange.bind(this, "pointName")}
                                        value={this.state.fields["pointName"]} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="outlined-basic-2" label="Value" name="value" type="number" variant="outlined" InputProps={{ inputProps: { min: 0, max: 1000 } }} onChange={this.handleChange.bind(this, "value")}
                                        value={this.state.fields["value"]} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="outlined" onClick={saveButton} style={{ marginTop: '10px' }}>Save</Button>
                                </Grid>
                            </Grid>
                        ) : ('')}

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <Container maxWidth="xl">
                                        <h3>Point List</h3>
                                        <div style={{ height: 400, width: '100%' }}>
                                            <DataGrid
                                                rows={this.state.pointList}
                                                columns={columns}
                                                pageSize={5}
                                                rowsPerPageOptions={[5]}
                                                checkboxSelection
                                                disableSelectionOnClick
                                            />
                                        </div>
                                    </Container>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </>
        );
    }
}



export default connector(PointPage);