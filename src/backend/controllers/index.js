const authController = require("./auth.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const userController = require("./user.controller");
const roomController = require("./room.controller");
const checkinController = require("./checkin.controller");
const checkoutController = require("./checkout.controller");
const roomAvailableController = require("./room.available.controller");

module.exports = (app) => {
	app.use("/api/auth", authController);
	app.use("/api/user", [isAuthenticated, isAdmin], userController);
	app.use("/api/room/available", [isAuthenticated], roomAvailableController);
	app.use("/api/room", [isAuthenticated, isAdmin], roomController);
	app.use("/api/checkin", [isAuthenticated], checkinController);
	app.use("/api/checkout", [isAuthenticated], checkoutController);
};
