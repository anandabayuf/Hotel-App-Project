const initialState = { show: false, title: "", message: "" };

const messageToastReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SHOW":
			return action.payload;
		case "HIDE":
			return initialState;
		default:
			return state;
	}
};

export default messageToastReducer;
