// counterSlice.js
/*
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // 👈👈👈
import pointServices from '../services/point.service';

export interface PointerState {
    pointList: any[]
}

const initialState: PointerState = {
    pointList: [],
}

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        getPointList: (state) => {
            console.log("state hdhdhdhh==>", state)
            pointServices.getPointList().then(
                (res: any) => {
                    console.log("sres==>", res)
                },
                (error: any) => {
                    console.log("error==>", error)
                }
            )


        },
        addPoint: (state, action) => {

        }
    },
    extraReducers(builder) {

    }
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = pointSlice;

export const { getPointList, addPoint } = actions

export default pointSlice.reducer 

*/

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // 👈👈👈
import pointServices from '../services/point.service';
import authServices from '../services/auth.service';

export interface PointerState {
    pointList: any[]
}

const initialState: PointerState = {
    pointList: [],
}

export const retrievePoints = createAsyncThunk(
    "points/retrieve",
    async () => {
        console.log("res 1 111 ==>")
        const res = await pointServices.getPointList();
        console.log("res 1==>", res)
        return res;
    }
);

export const createPoints = createAsyncThunk(
    "points/create",
    async (setPoint: any) => {
        const res = await pointServices.addPoint(setPoint);
        console.log("res 2==>", res)
        return res;
    }
);

export const logoutFromSlice = createAsyncThunk(
    "LOGOUT",
    async () => {
        const res = await authServices.logout();
        console.log("res 3==>", res)
        return res;
    }
);

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        x() {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(retrievePoints.fulfilled, (state, action) => {
            console.log("action 1", action)
            state.pointList = action.payload
        })
        builder.addCase(createPoints.fulfilled, (state, action) => {
            console.log("action 2", action)
            state.pointList.push(action.payload)
        })
        builder.addCase(logoutFromSlice.fulfilled, (state, action) => {
            console.log("action 3", action)
            console.log("state ===3", state.pointList)
            state.pointList = []
        })
    }
});
const { reducer } = pointSlice;
export default reducer;


// https://www.bezkoder.com/redux-toolkit-example-crud/

// https://redux-toolkit.js.org/api/createAsyncThunk