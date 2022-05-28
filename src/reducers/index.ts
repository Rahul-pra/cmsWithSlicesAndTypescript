import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from "./auth";
import contractReducer from "./contract.reducer";
import invoiceReducer from "./invoice.reducer";
// import pointReducer from "./point.reducer";
import pointSlice from "./point.slice";
const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth']
}

const rootReducer = combineReducers({
    auth,
    contractReducer,
    // pointReducer,
    invoiceReducer,
    pointSlice,
    // message,
    // user,
    // posts,
});

export default persistReducer(rootPersistConfig, rootReducer)