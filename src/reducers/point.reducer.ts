import {
    GET_POINT_LIST_SUCCESS,
    GET_POINT_LIST_FAIL,
    ADD_POINT_FAIL,
    ADD_POINT_SUCCESS,
    LOGOUT
} from "../actions/types";

const initialState = {
    pointList: [],
}

const pointReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POINT_LIST_SUCCESS:
            return {
                ...state,
                pointList: payload.pointList,
            };
        case GET_POINT_LIST_FAIL:
            return {
                ...state,
                pointList: initialState.pointList,
            };
        case ADD_POINT_SUCCESS:
            return {
                ...state,
                pointList: [...state.pointList, payload.pointList],
            };
        case ADD_POINT_FAIL:
            return {
                ...state,
                pointList: [...state.pointList],
            };
        case LOGOUT:
            return {
                ...state,
                contractList: initialState.pointList,
            };
        default:
            return state;
    }

}




export default pointReducer;