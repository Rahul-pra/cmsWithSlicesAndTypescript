import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";


/**
 * login
 * @param {string} email 
 * @param {string} password 
 */
export const login = (email: string, password: string) => (dispatch: any) => {
    return AuthService.login(email, password).then(
        (data: any) => {
            if (!!data) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: data },
                });

                return Promise.resolve();
            } else {

                dispatch({
                    type: LOGIN_FAIL,
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
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch: any) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });

};