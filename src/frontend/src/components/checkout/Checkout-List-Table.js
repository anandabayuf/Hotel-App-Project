export default function CheckoutListTable(props) {
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
						<th scope="col">Check Out Date</th>
						<th scope="col">Room No</th>
						<th scope="col">Customer Name</th>
						<th scope="col" className="text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{props.checkouts &&
						props.checkouts.map((el, index) => {
							return (
								<tr key={index}>
									<td>
										{new Date(
											el.checkOutDate
										).toLocaleString()}
									</td>
									<td>{el.checkIn.roomNo}</td>
									<td>{el.checkIn.customer.name}</td>
									<td className="text-center">
										<button
											className="btn btn-light"
											style={style.button}
											onClick={() =>
												props.handleClickDetail(el)
											}
										>
											View Data
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
