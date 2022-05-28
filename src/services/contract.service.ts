import axios from "axios";
//import authHeaderService from "./auth-header";
import config from "../config";
const ENDPOINT = config.ENDPOINT;


const getContractList = () => {
    //return axios.get(API_URL + "comments", { headers: authHeaderService() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    // return axios.get(API_URL + "users");

    return axios
        .get(ENDPOINT + "/jsonData/contract.json")
        .then((response: any) => {
            return response.data.data;
        })
        .catch(function (error) {
            return error;
        });
}


const contractServices = {
    getContractList,

}
export default contractServices