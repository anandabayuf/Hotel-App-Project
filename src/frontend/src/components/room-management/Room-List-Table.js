import { Trash, Pencil } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import Loader from "../Loader";
import { useEffect } from "react";


export default function RoomListTable(props) {
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

    useEffect(()=>{props.getRooms()},[props.rooms])

	return (
		<div>
			<table className="table">
				<thead className="text-center">
					<tr>
						<th scope="col">No</th>
						<th scope="col">Type</th>
						<th scope="col">Price</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{props.rooms &&
						props.rooms.map((el, index) => {
							return (
								<tr key={index}>
							<td scope="row">{el.roomNo}</td>
										<td >{el.type}</td>
										<td>{el.price}</td>
                                        <td>{el.status}</td>
									<td>
										{props.isLoading &&
										props.currentIndex === index ? (
											<Loader style={style} />
										) : (
											<div className="row justify-content-center">
												<div className="col-auto">
													<button
														className="btn btn-outline-warning"
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
														className="btn btn-outline-warning"
														style={style.iconButton}
													>
														<Pencil size={16} />
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-outline-danger"
														style={style.iconButton}
                                                        onClick={()=> props.removeRoom(el._id)}
                                                        
													>
														<Trash size={16} />
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
