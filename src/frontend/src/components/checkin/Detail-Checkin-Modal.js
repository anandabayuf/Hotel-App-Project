import { Badge } from "react-bootstrap";
import { idrFormat } from "../../utils/Formatter";
import DetailModal from "../Detail-Modal";

export default function DetailCheckinModal(props) {
	return (
		<DetailModal
			detailModalState={props.detailModalState}
			handleClose={props.handleCloseDetailModal}
			for="Check Out"
		>
			<div className="row justify-content-between mb-3">
				<div className="col-auto">
					<h5>Check In Information</h5>
				</div>
				<div className="col-auto">
					{props.checkIn.status === "Checked In" ? (
						<Badge pill bg="primary">
							{props.checkIn.status}
						</Badge>
					) : props.checkIn.status === "Done" ? (
						<Badge pill bg="success">
							{props.checkIn.status}
						</Badge>
					) : (
						<Badge pill bg="secondary">
							{props.checkIn.status}
						</Badge>
					)}
				</div>
			</div>
			<div className="row mb-3">
				<div className="col">
					<div className="mb-3">
						<h6>Check In Date</h6>
						<p>
							{new Date(
								props.checkIn.checkInDate
							).toLocaleString()}
						</p>
					</div>
					<div className="mb-3">
						<h6>Length Of Stay</h6>
						<p>
							{props.checkIn.lengthOfStay === 1
								? `${props.checkIn.lengthOfStay} day`
								: `${props.checkIn.lengthOfStay} days`}
						</p>
					</div>
				</div>
				<div className="col">
					<div className="mb-3">
						<h6>Due Date</h6>
						<p>
							{new Date(props.checkIn.dueDate).toLocaleString()}
						</p>
					</div>
					<div className="mb-3">
						<h6>Room No</h6>
						<p>{props.checkIn.roomNo}</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h5 className="mb-3">Customer Information</h5>
					<div className="mb-3">
						<h6>Name</h6>
						<p>{props.checkIn.customer.name}</p>
					</div>
					<div className="mb-3">
						<h6>ID/KTP</h6>
						<p>{props.checkIn.customer["ID"]}</p>
					</div>
					<div className="mb-3">
						<h6>Address</h6>
						<p>{props.checkIn.customer.address}</p>
					</div>
					<div className="mb-3">
						<h6>Phone Number</h6>
						<p>{props.checkIn.customer.phoneNumber}</p>
					</div>
				</div>
				<div className="col">
					<div className="row justify-content-between mb-3">
						<div className="col-auto">
							<h5>Billing Information</h5>
						</div>
						<div className="col-auto">
							{props.checkIn.paymentStatus === "Paid Off" ? (
								<Badge pill bg="success">
									{props.checkIn.paymentStatus}
								</Badge>
							) : (
								<Badge pill bg="warning">
									{props.checkIn.paymentStatus}
								</Badge>
							)}
						</div>
					</div>
					<div className="mb-3">
						<h6>Total Cost</h6>
						<p>{idrFormat(props.checkIn.totalCost)}</p>
					</div>
					<div className="mb-3">
						<h6>Down Payment</h6>
						<p>{idrFormat(props.checkIn.downPayment)}</p>
					</div>
					<div className="mb-3">
						<h6>Remains</h6>
						<p>{idrFormat(props.checkIn.remains)}</p>
					</div>
					<div className="mb-3">
						<h6>Change</h6>
						<p>{idrFormat(props.checkIn.change)}</p>
					</div>
				</div>
			</div>
			<hr />
			<div>
				<h5 className="mb-3">User In Charge</h5>
				<div>
					<h6>Username</h6>
					<p>{props.checkIn.userInCharge}</p>
				</div>
			</div>
		</DetailModal>
	);
}
