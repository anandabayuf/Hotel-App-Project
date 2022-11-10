const schema = require("./schema");
const roomModel = require("./room.model");

exports.create = (data, roomId) => {
	return new Promise((resolve, reject) => {
		roomModel.getById(roomId).then((res) => {
			console.log(res.status);
			if (res.status === "Not Available") {
				reject("This room is not available");
			} else {
				new schema.CheckInSchema(data).save((err, response) => {
					if (err) {
						reject(err);
					} else {
						roomModel
							.editStatus(roomId)
							.then(() => {
								resolve(response);
							})
							.catch((error) => {
								reject(error);
							});
					}
				});
			}
		});
	});
};

exports.getAll = (query) => {
	let { limit = 5, page = 1, ...search } = query;

	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.CheckInSchema.find(
			{
				status: { $in: ["Checked In", "Done"] },
				[key]: { $regex: `^${value}`, $options: "i" },
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					let data = result.map(async (el) => {
						// console.log(roomNo);
						const { data, ...datas } = await roomModel.getAll({
							roomNo: el.roomNo,
						});

						return {
							...el,
							room: data[0],
						};
					});

					Promise.all(data).then(async (res) => {
						const count = await schema.CheckInSchema.find({
							status: { $in: ["Checked In", "Done"] },
							[key]: { $regex: `^${value}`, $options: "i" },
						})
							.lean()
							.count();

						resolve({
							data: res,
							totalPages: Math.ceil(count / limit),
							currentPage: page,
							totalData: count,
						});
					});
				}
			}
		)
			.sort({ checkInDate: "desc" })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.lean();
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.CheckInSchema.findById(id, async (err, result) => {
			if (err) {
				reject(err);
			} else {
				const { data, ...datas } = await roomModel.getAll({
					roomNo: result.roomNo,
				});

				resolve({
					...result,
					room: data[0],
				});
			}
		}).lean();
	});
};

exports.editStatus = (id, roomId) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((findByIdRes) => {
				let data = {
					status:
						findByIdRes.status === "Checked In"
							? "Done"
							: "Checked Out",
				};

				if (data.status === "Checked Out") {
					data["paymentStatus"] = "Paid Off";
				}

				schema.CheckInSchema.findByIdAndUpdate(
					id,
					data,
					(err, result) => {
						if (err) {
							reject(err);
						} else {
							if (data.status === "Checked Out") {
								roomModel
									.editStatus(roomId)
									.then((editResult) => {
										this.getById(id)
											.then((res) => resolve(res))
											.catch((e) => reject(e));
									})
									.catch((editError) => {
										reject(editError);
									});
							} else {
								this.getById(id)
									.then((res) => resolve(res))
									.catch((e) => reject(e));
							}
						}
					}
				).lean();
			})
			.catch((err) => reject(err));
	});
};
