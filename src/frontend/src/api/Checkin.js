import { BASE_URL } from "./Helper";

const getAllCheckins = async (page, limit) => {
	try {
		const response = await fetch(
			`${BASE_URL}/checkin?page=${page}&limit=${limit}`,
			{
				headers: {
					Authorization: localStorage.getItem("TOKEN"),
				},
			}
		);
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		return { error: true, message: "Network Error" };
	}
};

const searchCheckin = async (category, value, page, limit) => {
	try {
		const response = await fetch(
			`${BASE_URL}/checkin?page=${page}&limit=${limit}&${category}=${value}`,
			{
				headers: {
					Authorization: localStorage.getItem("TOKEN"),
				},
			}
		);
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		return { error: true, message: "Network Error" };
	}
};

const getCheckinById = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/checkin/${id}`, {
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		return { error: true, message: "Network Error" };
	}
};

const createCheckin = async (data) => {
	try {
		const response = await fetch(`${BASE_URL}/checkin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("TOKEN"),
			},
			body: JSON.stringify(data),
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		return { error: true, message: "Network Error" };
	}
};

const updateCheckinStatus = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/checkin/status/${id}`, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		return { error: true, message: "Network Error" };
	}
};

export {
	getAllCheckins,
	getCheckinById,
	searchCheckin,
	createCheckin,
	updateCheckinStatus,
};
