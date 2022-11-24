const handleExpiredToken = (navigate) => {
	localStorage.removeItem("TOKEN");
	navigate("/login", {
		state: {
			toastState: {
				show: true,
				title: "Session has expired",
				message: "Your session has expired, please login",
			},
		},
	});
};

export { handleExpiredToken };
