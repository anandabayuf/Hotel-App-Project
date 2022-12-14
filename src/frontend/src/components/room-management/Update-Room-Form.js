import Loader from "../../components/Loader";

export default function UpdateRoomForm(props) {
	const style = {
		label: {
			color: "#3F72AF",
		},
		input: {
			borderRadius: "10px",
			borderColor: "#DBE2EF",
			color: "#3F72AF",
		},
		card: {
			border: "none",
			borderRadius: "20px",
		},
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<form onSubmit={props.handleSubmit}>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="roomNo"
				>
					Room No
				</label>
				<input
					type="text"
					className="form-control"
					id="roomNo"
					name="roomNo"
					value={props.room.roomNo}
					onChange={props.handleChange}
					style={style.input}
				/>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="type"
				>
					Type
				</label>
				<select
					className="form-select"
					style={style.input}
					id="type"
					name="type"
					value={props.room.type}
					onChange={props.handleChange}
				>
					<option value="Standard">Standard</option>
					<option value="Superior">Superior</option>
					<option value="Deluxe">Deluxe</option>
					<option value="Presidential Suite">
						Presidential Suite
					</option>
				</select>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="price"
				>
					Price
				</label>
				<input
					type="number"
					className="form-control"
					style={style.input}
					id="price"
					name="price"
					value={props.room.price}
					onChange={props.handleChange}
				/>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="facility"
				>
					Facility
				</label>
				<textarea
					rows="6"
					className="form-control"
					style={style.input}
					id="facility"
					name="facility"
					value={props.room.facility}
					onChange={props.handleChange}
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="picture"
					className="form-label"
					style={style.label}
				>
					Picture
				</label>
				<div className="row">
					<div className="col">
						<div className="mb-3 form-check form-switch">
							<input
								className="form-check-input"
								type="checkbox"
								role="switch"
								id="isEditPicture"
								name="isEditPicture"
								value={props.room.isEditPicture}
								onChange={props.handleChange}
								style={style.input}
							/>
							<label
								className="form-check-label"
								htmlFor="isEditPicture"
								style={style.label}
							>
								Edit Room Picture
							</label>
						</div>
						<input
							type="file"
							className="form-control"
							id="picture"
							name="picture"
							onChange={props.handleChange}
							style={style.input}
							accept="image/*"
							disabled={!props.room.isEditPicture}
						/>
					</div>
					<div className="col">
						<div className="card text-center" style={style.card}>
							<div className="card-body">
								<h6
									className="card-title mb-3"
									style={style.label}
								>
									Picture Preview
								</h6>
								{!props.room.isEditPicture &&
								props.room.pictureFromDB ? (
									<img
										src={`data:image/png;base64,${props.room.pictureFromDB.data}`}
										width={500}
										alt="room"
									/>
								) : (
									props.picPreview && (
										<img
											src={props.picPreview}
											width={500}
											alt="room"
										/>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{props.isLoading ? (
				<Loader />
			) : (
				<div className="row">
					<div className="col">
						<div className="d-grid gap-2">
							<button
								className="btn btn-dark shadow"
								type="button"
								style={style.button}
								onClick={() => props.handleCancel()}
							>
								Cancel
							</button>
						</div>
					</div>
					<div className="col">
						<div className="d-grid gap-1">
							<button
								className="btn btn-success shadow"
								type="submit"
								style={style.button}
								disabled={
									props.room.roomNo === "" ||
									props.room.type === "" ||
									props.room.facility === "" ||
									props.room.price === "" ||
									(props.room.isEditPicture &&
										props.room.picture === undefined)
								}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
