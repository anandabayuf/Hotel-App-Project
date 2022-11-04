const express = require("express");
const router = express.Router();

const roomModel = require("../models/room.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get all rooms data",
			data: await roomModel.getAllAvailable(),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get all rooms data",
			detail: err,
		});
	}
});

module.exports = router;
