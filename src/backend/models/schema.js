const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/HotelAppDB")
	.then(() => {
		console.log("MongoDB connection has been established successfully.");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB: ", error);
	});

exports.UserSchema = mongoose.model("User", {
	username: {
		type: String,
		unique: true,
		required: true,
		dropDups: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["Admin", "Receptionist"],
		default: "Receptionist",
	},
	status: {
		type: String,
		required: true,
		enum: ["Active", "Inactive"],
		default: "Active",
	},
	createdBy: {
		type: String,
		required: true,
	},
});

// exports.CarSchema = mongoose.model("Car", {
// 	plateNo: {
// 		type: String,
// 		unique: true,
// 		required: true,
// 		dropDups: true,
// 	},
// 	brand: String,
// 	type: String,
// 	year: Number,
// 	rentPrice: {
// 		perDay: Number,
// 		perHour: Number,
// 	},
// 	picture: {
// 		data: Buffer,
// 		contentType: String,
// 	},
// 	status: {
// 		type: String,
// 		enum: ["Available", "Not Available"],
// 		require: true,
// 		default: "Available",
// 	},
// 	user: {
// 		username: String,
// 		email: String,
// 	},
// });

// exports.BorrowSchema = mongoose.model("Borrow", {
// 	unixBookDate: Number, //when they do book //date and time
// 	customer: {
// 		name: String,
// 		ID: String,
// 		address: String,
// 		phoneNumber: String,
// 	},
// 	carPlateNo: String,
// 	daysToBorrow: Number,
// 	hoursToBorrow: Number,
// 	totalCost: Number,
// 	downPayment: Number,
// 	remains: Number,
// 	status: {
// 		type: String,
// 		enum: ["Booked", "On Doing", "Done", "Returned"],
// 		require: true,
// 		default: "Booked",
// 	},
// 	unixDepartDate: Number, //date and time
// 	unixReturnDate: Number,
// 	user: {
// 		username: String,
// 		email: String,
// 	},
// });

// exports.ReturnSchema = mongoose.model("Return", {
// 	returnDate: { type: Date, default: Date.now },
// 	borrowId: String,
// 	lost: {
// 		isLost: Boolean,
// 		fine: Number,
// 		information: String,
// 	},
// 	broken: {
// 		isBroken: Boolean,
// 		fine: Number,
// 		information: String,
// 	},
// 	late: {
// 		isLate: Boolean,
// 		fine: Number,
// 		information: String,
// 	},
// 	totalPrice: Number,
// 	repayment: Number,
// 	change: Number,
// 	user: {
// 		username: String,
// 		email: String,
// 	},
// });
