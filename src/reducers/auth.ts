
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user") as string);

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const auth = (state = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                state: undefined,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

export default auth;