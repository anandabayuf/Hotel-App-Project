import { BASE_URL } from "./Helper";

const getAllCheckout = async (page, limit) => {
	try {
		const response = await fetch(
			`${BASE_URL}/checkout?page=${page}&limit=${limit}`,
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

const searchCheckout = async (category, value, page, limit) => {
	try {
		const response = await fetch(
			`${BASE_URL}/checkout?page=${page}&limit=${limit}&${category}=${value}`,
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

const createCheckout = async (data) => {
	try {
		const response = await fetch(`${BASE_URL}/checkout`, {
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

export { getAllCheckout, searchCheckout, createCheckout };
