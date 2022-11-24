import { Modal } from "react-bootstrap";

export default function DetailModal(props) {
	const style = {
		body: { padding: "20px 50px 50px 50px" },
	};

	return (
		<Modal
			show={props.detailModalState}
			onHide={() => props.handleClose()}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Detail {props.for}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={style.body}>{props.children}</Modal.Body>
		</Modal>
	);
}
