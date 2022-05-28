import {
    GET_POINT_LIST_SUCCESS,
    GET_POINT_LIST_FAIL,
    ADD_POINT_FAIL,
    ADD_POINT_SUCCESS,
    SET_MESSAGE,
} from "./types";

import pointServices from "../services/point.service";

export interface pointModel {
    id: number;
    pointName: string;
    value: number;
    contractName: string;
}


export const getPointList = () => (dispatch: any) => {
    return pointServices.getPointList().then(
        (data: any) => {
            if (!!data) {
                dispatch({
                    type: GET_POINT_LIST_SUCCESS,
                    payload: { pointList: data },
                });

                return Promise.resolve();
            } else {

                dispatch({
                    type: GET_POINT_LIST_FAIL,
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
                type: GET_POINT_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
}

export const addPoint = (setPoint: pointModel) => (dispatch: any) => {

    return pointServices.addPoint(setPoint).then(
        (data: any) => {
            if (!!data) {
                dispatch({
                    type: ADD_POINT_SUCCESS,
                    payload: { pointList: data },
                });

                return Promise.resolve();
            } else {

                dispatch({
                    type: ADD_POINT_FAIL,
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
                type: GET_POINT_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );

}