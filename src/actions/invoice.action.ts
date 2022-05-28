import invoiceServices from "../services/invoice.service";
import {
    GET_INVOICE_LIST_SUCCESS,
    GET_INVOICE_LIST_FAIL,
    SET_MESSAGE,
} from "./types";



export interface invoiceModel {
    id: number;
    pointName: string;
    value: number;
    contractName: string;
}

export const getInvoiceList = () => (dispatch: any) => {
    return invoiceServices.getInvoiceList().then(
        (data: any) => {
            if (!!data) {
                dispatch({
                    type: GET_INVOICE_LIST_SUCCESS,
                    payload: { invoiceList: data },
                });

                return Promise.resolve();
            } else {

                dispatch({
                    type: GET_INVOICE_LIST_FAIL,
                });

                return Promise.reject();
            }
        },
        (error: any) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_INVOICE_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
}