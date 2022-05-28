import { pointModel } from "../actions/point.action";
import axios from "axios";
//import authHeaderService from "./auth-header";
import config from "../config";
const ENDPOINT = config.ENDPOINT;




const getPointList = () => {
    //return axios.get(API_URL + "comments", { headers: authHeaderService() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    // return axios.get(API_URL + "users");

    return axios
        .get(ENDPOINT + "/jsonData/point.json")
        .then((response: any) => {
            return response.data.data;
        })
        .catch(function (error) {
            return error;
        });
}

const addPoint = (addPoint: pointModel) => {
    return axios
        .get(ENDPOINT + "/jsonData/point.json")
        .then((response: any) => {
            return addPoint;
        })
        .catch(function (error) {
            return error;
        });
}


const pointServices = {
    getPointList,
    addPoint
}
export default pointServices