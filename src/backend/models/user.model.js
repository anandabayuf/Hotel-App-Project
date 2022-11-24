const schema = require("./schema");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.UserSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};

exports.getAll = (query, userLoggedIn) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.UserSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" } },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					const newRes = result.filter((user) => {
						return user.username !== userLoggedIn.username;
					});
					console.log(newRes);

					const count = await schema.UserSchema.find({
						[key]: { $regex: `^${value}`, $options: "i" },
					})
						.lean()
						.count();

					resolve({
						data: newRes,
						totalPages: Math.ceil(count / limit),
						currentPage: page,
						totalData: count,
					});
				}
			}
		)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.lean();
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findById(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		}).lean();
	});
};

exports.editStatus = (id) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((findByIdRes) => {
				const data = {
					status:
						findByIdRes.status === "Active" ? "Inactive" : "Active",
				};

				schema.UserSchema.findByIdAndUpdate(id, data, (err, result) => {
					if (err) {
						reject(err);
					} else {
						this.getById(id)
							.then((res) => resolve(res))
							.catch((e) => reject(e));
					}
				}).lean();
			})
			.catch((err) => reject(err));
	});
};

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findByIdAndDelete(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};
