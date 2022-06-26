import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducer/rootReducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);
