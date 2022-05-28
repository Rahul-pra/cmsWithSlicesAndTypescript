import {
    GET_CONTRACT_LIST_SUCCESS,
    GET_CONTRACT_LIST_FAIL,
    SET_MESSAGE,
} from "./types";

import contractServices from "../services/contract.service";


export interface contractModel {
    id: number;
    startDate: string;
    endDate: string;
    contractName: string;
}

/**
 * getContractList
 * 
 */

export const getContractList = () => (dispatch: any) => {
    return contractServices.getContractList().then(
        (data: any) => {
            if (!!data) {
                dispatch({
                    type: GET_CONTRACT_LIST_SUCCESS,
                    payload: { contractList: data },
                });

                return Promise.resolve();
            } else {

                dispatch({
                    type: GET_CONTRACT_LIST_FAIL,
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
                type: GET_CONTRACT_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
}