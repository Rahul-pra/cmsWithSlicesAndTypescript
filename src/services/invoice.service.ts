import axios from "axios";
//import authHeaderService from "./auth-header";
import config from "../config";
const ENDPOINT = config.ENDPOINT;

const getInvoiceList = () => {
    return axios
        .get(ENDPOINT + "/jsonData/point.json")
        .then((response: any) => {
            return response.data.data;
        })
        .catch(function (error) {
            return error;
        });
}


const invoiceServices = {
    getInvoiceList,
}
export default invoiceServices