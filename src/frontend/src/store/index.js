import { combineReducers } from "redux";
import messageToastReducer from "./reducers/Message-Toast-Reducer";

const allReducers = combineReducers({
	messageToast: messageToastReducer,
});

export default allReducers;
