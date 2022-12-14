import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import CopyRight from "./Copyright";

export default function SideBar(props) {
	const navigate = useNavigate();

	const handleSignOut = () => {
		localStorage.removeItem("TOKEN");
		navigate("/login");
	};

	const style = {
		signOutButton: {
			borderRadius: "15px",
		},
		title: {
			color: "#112D4E",
		},
	};

	return (
		<Offcanvas show={props.show} onHide={props.handleClose}>
			<Offcanvas.Header>
				<Offcanvas.Title style={style.title}>
					Hotel Information System
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Accordion flush>
					{props.role === "Admin" && (
						<Accordion.Item eventKey="0">
							<Accordion.Header>Management</Accordion.Header>
							<Accordion.Body>
								<Nav className="flex-column">
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/management/rooms"
											onClick={props.handleClose}
										>
											Rooms
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/management/users"
											onClick={props.handleClose}
										>
											Users
										</Link>
									</li>
								</Nav>
							</Accordion.Body>
						</Accordion.Item>
					)}
					<Accordion.Item eventKey="1">
						<Accordion.Header>Transaction</Accordion.Header>
						<Accordion.Body>
							<Nav className="flex-column">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="transaction/checkin"
										onClick={props.handleClose}
									>
										Check In
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="transaction/checkout"
										onClick={props.handleClose}
									>
										Check Out
									</Link>
								</li>
							</Nav>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>Settings</Accordion.Header>
						<Accordion.Body>
							<Nav className="flex-column">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="transaction/checkin"
										onClick={props.handleClose}
									>
										My Profile
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="settings/about-us"
										onClick={props.handleClose}
									>
										About Us
									</Link>
								</li>
							</Nav>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Offcanvas.Body>
			<div className="d-grid gap-2" style={{ padding: "10px" }}>
				<button
					className="btn btn-danger"
					style={style.signOutButton}
					onClick={() => handleSignOut()}
				>
					<BoxArrowRight size={16} /> Sign Out
				</button>
			</div>
			<CopyRight />
		</Offcanvas>
	);
}
