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
				<Toast.Header
					className={
						props.toastState.title === "Failed"
							? "bg-danger text-light"
							: props.toastState.title === "Success"
							? "bg-success text-light"
							: "bg-secondary text-light"
					}
				>
					<strong className="me-auto">
						{props.toastState.title}
					</strong>
				</Toast.Header>
				<Toast.Body
					className={
						props.toastState.title === "Failed"
							? "bg-danger text-light"
							: props.toastState.title === "Success"
							? "bg-success text-light"
							: "bg-secondary text-light"
					}
				>
					{props.toastState.message}
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}
