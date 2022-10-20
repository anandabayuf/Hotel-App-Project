import { Eye } from "react-bootstrap-icons";

export default function CheckoutListTable(props) {
	const style = {
		loader: {
			color: "#3F72AF",
		},
		button: {
			borderRadius: "15px",
		},
		iconButton: {
			borderRadius: "50px",
		},
	};

	return (
		<div>
			<table className="table">
				<thead className="text-center">
					<tr>
						<th scope="col">Checkout Date</th>
						<th scope="col">Room No</th>
						<th scope="col">Customer Name</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{props.checkouts &&
						props.checkouts.map((el, index) => {
							return (
								<tr key={index}>
									<td scope="row">
										{new Date(
											el.checkOutDate
										).toLocaleString()}
									</td>
									<td>{el.checkIn.room.roomNo}</td>
									<td>{el.checkIn.customer.name}</td>
									<td className="text-center">
										<button
											className="btn btn-outline-info"
											style={style.iconButton}
											onClick={() =>
												props.handleClickDetail(el)
											}
										>
											<Eye size={16} />
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
