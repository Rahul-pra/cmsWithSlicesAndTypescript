import {
    GET_CONTRACT_LIST_SUCCESS,
    GET_CONTRACT_LIST_FAIL,
    LOGOUT
} from "../actions/types";


//import initialState from "./initialState";
const initialState = {
    contractList: [],
}

const contractReducer = (state = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CONTRACT_LIST_SUCCESS:
            return {
                ...state,
                contractList: payload.contractList,
            };
        case GET_CONTRACT_LIST_FAIL:
            return {
                ...state,
                contractList: null,
            };
        case LOGOUT:
            return {
                ...state,
                contractList: initialState.contractList,
            };
        default:
            return state;
    }

}




export default contractReducer;