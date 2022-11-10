const showMessageToast = (toastState) => {
	return {
		type: "SHOW",
		payload: toastState,
	};
};

const hideMessageToast = () => {
	return {
		type: "HIDE",
	};
};

export { showMessageToast, hideMessageToast };
