import {
    GET_INVOICE_LIST_FAIL,
    GET_INVOICE_LIST_SUCCESS,
    LOGOUT
} from "../actions/types";


//import initialState from "./initialState";
const initialState = {
    invoiceList: [],
}

const invoiceReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_INVOICE_LIST_SUCCESS:
            return {
                ...state,
                invoiceList: payload.invoiceList,
            };
        case GET_INVOICE_LIST_FAIL:
            return {
                ...state,
                invoiceList: initialState.invoiceList,
            };
        case LOGOUT:
            return {
                ...state,
                contractList: initialState.invoiceList,
            };
        default:
            return state;
    }

}

export default invoiceReducer;