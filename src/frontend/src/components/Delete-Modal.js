import { Modal } from "react-bootstrap";

export default function DeleteModal(props) {
	const style = {
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<Modal
			show={props.deleteModalState}
			onHide={() => props.handleClose()}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete {props.for}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p className="text-center">
					Are you sure you want to delete the {props.for} data with
					<br />
					{props.identifier}: {props.children}?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<div className="row justify-content-end">
					<div className="col-auto">
						<button
							className="btn btn-outline-dark"
							onClick={() => props.handleClose()}
							style={style.button}
						>
							Cancel
						</button>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-danger"
							onClick={() => props.handleDelete()}
							style={style.button}
						>
							Delete
						</button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
