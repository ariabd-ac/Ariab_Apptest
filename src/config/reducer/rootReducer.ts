import { combineReducers } from "redux";
import contactReducer from "./contactReducer";

const rootReducers = combineReducers({
  contact: contactReducer,
});

export default rootReducers;
