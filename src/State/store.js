import { createStore, combineReducers } from "redux";
import { app } from "./reducers/app";
import { pageLayout } from "./reducers/pageLayout";

import { componentsInfo } from "./reducers/componentsInfo";

var r = combineReducers({ componentsInfo, app, pageLayout });
export const store = createStore(r);
