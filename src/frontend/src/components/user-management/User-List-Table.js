import { Badge } from "react-bootstrap";
import Loader from "../Loader";

export default function UserListTable(props) {
	const style = {
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<div>
			<table className="table">
				<thead className="text-center">
					<tr>
						<th scope="col">Username</th>
						<th scope="col">Name</th>
						<th scope="col">Role</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{props.users &&
						props.users.map((el, index) => {
							return (
								<tr key={index}>
									<td>{el.username}</td>
									<td>{el.name}</td>
									<td className="text-center">{el.role}</td>
									<td className="text-center">
										{el.status === "Active" ? (
											<Badge pill bg="success">
												{el.status}
											</Badge>
										) : (
											<Badge pill bg="secondary">
												{el.status}
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
														className="btn btn-warning"
														style={style.button}
														onClick={() =>
															props.handleChangeStatus(
																el._id,
																index
															)
														}
													>
														Change Status
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-warning"
														style={style.button}
														onClick={() =>
															props.handleUpdateUser(
																el._id
															)
														}
													>
														Update
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-danger"
														style={style.button}
														onClick={() =>
															props.handleClickDelete(
																el,
																index
															)
														}
													>
														Delete
													</button>
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
