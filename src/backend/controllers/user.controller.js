const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const userModel = require("../models/user.model");

router.get("", async (req, res) => {
	try {
		const { data, ...rest } = await userModel.getAll(req.query, req.user);

		let users = [];

		if (data.length > 0) {
			users = data.map((el) => {
				const { password, salt, ...rest } = el;
				return rest;
			});
		}

		res.status(200).json({
			status: 200,
			message: "Successfully get all users data",
			data: users,
			...rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get all users data",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await userModel.getById(req.params.id);

		const { password, salt, ...rest } = user;

		res.status(200).json({
			status: 200,
			message: "Successfully get user data",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get user data",
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	data.salt = crypto.randomBytes(16).toString("hex");
	data.password = crypto
		.pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`)
		.toString(`hex`);

	data.createdBy = req.user.username;

	try {
		const response = await userModel.create(data);

		const { password, salt, ...rest } = response;

		res.status(201).json({
			status: 201,
			message: "Successfully create user",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create user",
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	let data = req.body;

	if (data.password) {
		data.salt = crypto.randomBytes(16).toString("hex");
		data.password = crypto
			.pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`)
			.toString(`hex`);
	}

	try {
		const user = await userModel.edit(req.params.id, data);

		const { password, salt, ...rest } = user;

		res.status(201).json({
			status: 201,
			message: "Successfully edit user data",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit user data",
			detail: err,
		});
	}
});

router.put("/status/:id", async (req, res) => {
	try {
		const user = await userModel.editStatus(req.params.id);

		const { password, salt, ...rest } = user;

		res.status(201).json({
			status: 201,
			message: "Successfully edit user status data",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit user status data",
			detail: err,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await userModel.delete(req.params.id);
		res.status(200).json({
			status: 204,
			message: "Successfully delete user data",
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to delete user data",
			detail: err,
		});
	}
});

module.exports = router;
