import WaButton from "../../assets/WhatsAppButtonWhiteSmall.svg";
import { Github } from "react-bootstrap-icons";

export default function PeopleAboutCard(props) {
	return (
		<div
			className="card mb-3 shadow"
			style={{ border: "none", borderRadius: "20px" }}
		>
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src={props.people.img}
						className="img-fluid"
						alt={props.people.name}
						style={{
							borderTopLeftRadius: "20px",
							borderBottomLeftRadius: "20px",
						}}
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{props.people.name}</h5>
						<div className="row">
							<div className="col-4">
								<h6>Email:</h6>
							</div>
							<div className="col-8">
								<p className="card-text">
									{props.people.email}
								</p>
							</div>
							<div className="col-4">
								<h6>Phone:</h6>
							</div>
							<div className="col-8">
								<p className="card-text">
									{props.people.phone}
								</p>
							</div>
						</div>
						<div
							className="row align-items-end justify-content-center"
							style={{ height: "90px" }}
						>
							<div className="col-auto">
								<a
									aria-label="Chat on WhatsApp"
									href={props.people.wa}
									target="_blank"
									rel="noopener noreferrer"
									className="shadow"
								>
									<img
										alt="Chat on WhatsApp"
										src={WaButton}
									/>
								</a>
							</div>
							<div className="col-auto">
								<a
									href={props.people.github}
									target="_blank"
									rel="noopener noreferrer"
								>
									<button
										className="btn btn-light shadow"
										style={{
											borderRadius: "15px",
										}}
									>
										<Github /> Github
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
