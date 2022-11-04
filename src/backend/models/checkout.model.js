const schema = require("./schema");
const checkInModel = require("./checkin.model");

exports.create = (data, checkInId, roomId) => {
	return new Promise((resolve, reject) => {
		new schema.CheckOutSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				checkInModel
					.editStatus(checkInId, roomId)
					.then(() => {
						resolve(response);
					})
					.catch((error) => {
						reject(error);
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
		schema.CheckOutSchema.find(
			{
				[key]: { $regex: `^${value}`, $options: "i" },
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					let data = result.map(async (el) => {
						const { checkInId, ...rest } = el;

						const checkIn = await checkInModel.getById(checkInId);

						return {
							...rest,
							checkIn,
						};
					});

					Promise.all(data).then(async (res) => {
						const count = await schema.CheckOutSchema.find({
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
			.sort({ checkOutDate: "desc" })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.lean();
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.CheckOutSchema.findById(id, async (err, result) => {
			if (err) {
				reject(err);
			} else {
				const { checkInId, ...rest } = result;

				const checkIn = await checkInModel.getById(checkInId);

				resolve({
					...rest,
					checkIn,
				});
			}
		}).lean();
	});
};
