import { BASE_URL } from "./Helper";

const getAllUser = async (page, limit) => {
	try {
		const response = await fetch(
			`${BASE_URL}/user?page=${page}&limit=${limit}`,
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

const searchUser = async (category, value, page, limit) => {
	try {
		const response = await fetch(
			`${BASE_URL}/user?page=${page}&limit=${limit}&${category}=${value}`,
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

const getUserById = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${id}`, {
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

const createUser = async (data) => {
	try {
		const response = await fetch(`${BASE_URL}/user`, {
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

const updateUser = async (id, data) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${id}`, {
			method: "PUT",
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

const updateUserStatus = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/status/${id}`, {
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

const deleteUser = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${id}`, {
			method: "DELETE",
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
	getAllUser,
	searchUser,
	getUserById,
	createUser,
	updateUser,
	updateUserStatus,
	deleteUser,
};
