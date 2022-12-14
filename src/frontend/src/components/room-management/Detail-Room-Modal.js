import { Badge } from "react-bootstrap";
import { idrFormat } from "../../utils/Formatter";
import DetailModal from "../Detail-Modal";

export default function DetailRoomModal(props) {
	return (
		<DetailModal
			detailModalState={props.detailModalState}
			handleClose={props.handleCloseDetailModal}
			for="Room"
		>
			<div className="row justify-content-between">
				<div className="col-auto">
					<h5>Room Information</h5>
				</div>
				<div className="col-auto">
					<Badge
						bg={
							props.room.status === "Available"
								? "success"
								: "secondary"
						}
					>
						{props.room.status}
					</Badge>
				</div>
			</div>
			<div className="mb-3 text-center">
				<img
					src={`data:image/png;base64,${props.room.picture.data}`}
					width={500}
					alt="room"
				/>
			</div>
			<div className="mb-3">
				<div className="row">
					<div className="col">
						<div className="mb-3">
							<h6>Room No</h6>
							<p>{props.room.roomNo}</p>
						</div>
						<div className="mb-3">
							<h6>Type</h6>
							<p>{props.room.type}</p>
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<h6>Price</h6>
							<p>{idrFormat(props.room.price)}</p>
						</div>
						<div className="mb-3">
							<h6>Facility</h6>
							<span style={{ whiteSpace: "pre-line" }}>
								{props.room.facility}
							</span>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div>
				<h5 className="mb-3">Created By</h5>
				<div className="row">
					<div className="col">
						<div>
							<h6>Username</h6>
							<p>{props.room.createdBy}</p>
						</div>
					</div>
				</div>
			</div>
		</DetailModal>
	);
}
