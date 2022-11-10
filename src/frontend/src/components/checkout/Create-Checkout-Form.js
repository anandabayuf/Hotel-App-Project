import { idrFormat } from "../../utils/Formatter";
import Loader from "../Loader";

export default function CreateCheckoutForm(props) {
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
			padding: "20px",
		},
		button: {
			borderRadius: "15px",
		},
	};
	return (
		<form onSubmit={props.handleSubmit}>
			<div className="card shadow mb-3" style={style.card}>
				<div className="card-body">
					<h5 className="card-title mb-3" style={style.title}>
						Customer
					</h5>
					<div className="row mb-3">
						<div className="col">
							<h6>ID/KTP</h6>
							<p>{props.customer["ID"]}</p>
						</div>
						<div className="col">
							<h6>Name</h6>
							<p>{props.customer["name"]}</p>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<h6>Address</h6>
							<p>{props.customer["address"]}</p>
						</div>
						<div className="col">
							<h6>Phone Number</h6>
							<p>{props.customer["phoneNumber"]}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row mb-5">
				<div className="col">
					<div className="card shadow" style={style.card}>
						<div className="card-body">
							<h5 className="card-title mb-3">
								Check In Information
							</h5>
							<div className="row mb-3">
								<div className="col">
									<h6>Check In Date</h6>
									<p>
										{new Date(
											props.checkIn.checkInDate
										).toLocaleString()}
									</p>
								</div>
								<div className="col">
									<h6>Due Date</h6>
									<p>
										{new Date(
											props.checkIn.dueDate
										).toLocaleString()}
									</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col">
									<h6>Length Of Stay</h6>
									<p>
										{props.checkIn.lengthOfStay === 1
											? `${props.checkIn.lengthOfStay} day`
											: `${props.checkIn.lengthOfStay} days`}
									</p>
								</div>
							</div>
							<h6
								style={{
									textDecoration: "underline",
								}}
							>
								Room Information
							</h6>
							<div className="mb-3 text-center">
								{props.room.picture && (
									<img
										src={`data:image/png;base64,${props.room.picture.data}`}
										width={500}
										alt="room preview"
									/>
								)}
							</div>
							<div className="row mb-3">
								<div className="col">
									<h6>Room No</h6>
									<p>{props.room.roomNo}</p>
								</div>
								<div className="col">
									<h6>Price</h6>
									<p>{idrFormat(props.room.price || 0)}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<h6>Type</h6>
									<p>{props.room.type}</p>
								</div>
								<div className="col">
									<h6>Facility</h6>
									<span
										style={{
											whiteSpace: "pre-line",
										}}
									>
										{props.room.facility}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card shadow" style={style.card}>
						<div className="card-body">
							<h5 className="card-title mb-3" style={style.title}>
								Billing Information
							</h5>
							<div className="row mb-3">
								<div className="col">
									<h6>Total Cost</h6>
									<p>
										{idrFormat(
											props.checkIn.totalCost || 0
										)}
									</p>
								</div>
								<div className="col">
									<h6>Down Payment</h6>
									<p>
										{idrFormat(
											props.checkIn.downPayment || 0
										)}
									</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col">
									<h6>Remains</h6>
									<p>
										{idrFormat(props.checkIn.remains || 0)}
									</p>
								</div>
							</div>
							<hr />
							<div className="mb-3">
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										role="switch"
										id="isLate"
										name="isLate"
										value={props.checkOut.late.isLate}
										onChange={props.handleChange}
										style={style.input}
									/>
									<label
										className="form-check-label"
										htmlFor="isLate"
										style={style.label}
									>
										Late
									</label>
								</div>
							</div>
							{props.checkOut.late.isLate && (
								<div className="row mb-3">
									<div className="col">
										<label
											htmlFor="information"
											className="form-label"
											style={style.label}
										>
											Information
										</label>
										<input
											type="text"
											className="form-control"
											id="information"
											name="information"
											value={props.checkOut.information}
											onChange={props.handleChange}
											style={style.input}
										/>
									</div>
									<div className="col">
										<label
											htmlFor="fine"
											className="form-label"
											style={style.label}
										>
											Fine
										</label>
										<input
											type="number"
											className="form-control"
											id="fine"
											name="fine"
											value={props.checkOut.fine}
											onChange={props.handleChange}
											style={style.input}
										/>
									</div>
								</div>
							)}
							<div className="row mb-3">
								<div className="col">
									<h6>Total Price</h6>
									<p>
										{idrFormat(
											props.checkOut.totalPrice || 0
										)}
									</p>
								</div>
								<div className="col">
									<h6>Change</h6>
									<p>
										{idrFormat(
											props.checkOut.change < 0
												? 0
												: props.checkOut.change || 0
										)}
									</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col">
									<h6>Remains</h6>
									<p>
										{idrFormat(props.checkOut.remains || 0)}
									</p>
								</div>
							</div>
							<div className="mb-3">
								<label
									htmlFor="downPayment"
									className="form-label"
									style={style.label}
								>
									Repayment
								</label>
								<input
									type="number"
									className="form-control"
									id="repayment"
									name="repayment"
									value={props.checkOut.repayment}
									onChange={props.handleChange}
									style={style.input}
								/>
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
								onClick={() => props.handleCancel()}
								style={style.button}
							>
								Cancel
							</button>
						</div>
					</div>
					<div className="col">
						<div className="d-grid gap-2">
							<button
								className="btn btn-success shadow"
								type="submit"
								style={style.button}
							>
								Check Out
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
