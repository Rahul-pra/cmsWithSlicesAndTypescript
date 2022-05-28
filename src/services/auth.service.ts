import axios from "axios";
import config from "../config";
const ENDPOINT = config.ENDPOINT;



const login = (email: string, password: string) => {
    // APi call
    // return axios
    //     .post(API_URL + "login", {
    //         email,
    //         password,
    //     })
    //     .then((response: any) => {
    //         if (response.data.accessToken) {
    //             localStorage.setItem("user", JSON.stringify(response.data));
    //         }

    //         return response.data;
    //     });


    return axios
        .get(ENDPOINT + "/jsonData/user.json")
        .then((response: any) => {
            if (response.data.data.accessToken && email === response.data.data.email && password === response.data.data.password) {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });

};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("persist:root");
    localStorage.clear()
};

const authServices = {
    login,
    logout,
};

export default authServices