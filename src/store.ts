// import { createStore, applyMiddleware } from "redux";

// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const middleware = [thunk];

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers'

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
}



const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)