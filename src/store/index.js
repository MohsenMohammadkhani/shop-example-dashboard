import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import makeSagaMiddleware from "redux-saga";
import reducer from "./reducers/index.js";
import sagaApi from "./saga/index.js";

const sagaMiddleware = makeSagaMiddleware();

let store;
if (process.env.REACT_APP_STATE === "DEVELOPMENT") {
  store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
} else if (process.env.REACT_APP_STATE === "PRODUCTION") {
  store = createStore(reducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(sagaApi);

export default store;
