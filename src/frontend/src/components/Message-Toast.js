import { Toast, ToastContainer } from "react-bootstrap";

export default function MessageToast(props) {
	return (
		<ToastContainer
			className="p-3"
			position="bottom-end"
			containerPosition="fixed"
		>
			<Toast
				show={props.toastState.show}
				onClose={() => props.handleClose()}
			>
				<Toast.Header>
					<strong className="me-auto">
						{props.toastState.title}
					</strong>
				</Toast.Header>
				<Toast.Body>Message: {props.toastState.message}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}
