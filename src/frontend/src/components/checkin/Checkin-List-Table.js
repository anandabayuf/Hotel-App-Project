import { Badge } from "react-bootstrap";
import { idrFormat } from "../../utils/Formatter";
import Loader from "../Loader";

export default function CheckinListTable(props) {
	const style = {
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Check In Date</th>
						<th scope="col">Due Date</th>
						<th scope="col">Room No</th>
						<th scope="col">Customer Name</th>
						<th scope="col">Total Cost</th>
						<th scope="col">Status</th>
						<th scope="col">Payment Status</th>
						<th scope="col" className="text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{props.checkins &&
						props.checkins.map((el, index) => {
							return (
								<tr key={index}>
									<td>
										{new Date(
											el.checkInDate
										).toLocaleString()}
									</td>
									<td>
										{new Date(el.dueDate).toLocaleString()}
									</td>
									<td>{el.roomNo}</td>
									<td>{el.customer.name}</td>
									<td>{idrFormat(el.totalCost)}</td>
									<td className="text-center">
										{el.status === "Checked In" ? (
											<Badge pill bg="primary">
												{el.status}
											</Badge>
										) : el.status === "Done" ? (
											<Badge pill bg="success">
												{el.status}
											</Badge>
										) : (
											<Badge pill bg="secondary">
												{el.status}
											</Badge>
										)}
									</td>
									<td className="text-center">
										{el.paymentStatus === "Paid Off" ? (
											<Badge pill bg="success">
												{el.paymentStatus}
											</Badge>
										) : (
											<Badge pill bg="warning">
												{el.paymentStatus}
											</Badge>
										)}
									</td>
									<td>
										{props.isLoading &&
										props.currentIndex === index ? (
											<Loader />
										) : (
											<div className="row justify-content-center">
												<div className="col-auto">
													<button
														className="btn btn-light"
														style={style.button}
														onClick={() =>
															props.handleClickDetail(
																el
															)
														}
													>
														View Data
													</button>
												</div>
												<div className="col-auto">
													{el.status === "Done" ? (
														<button
															className="btn btn-danger"
															style={style.button}
															onClick={() =>
																props.handleClickUpdateStatus(
																	el,
																	index
																)
															}
														>
															Check Out
														</button>
													) : el.status ===
													  "Checked In" ? (
														<button
															className="btn btn-warning"
															style={style.button}
															onClick={() =>
																props.handleClickUpdateStatus(
																	el,
																	index
																)
															}
														>
															Change Status
														</button>
													) : (
														<></>
													)}
												</div>
											</div>
										)}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
