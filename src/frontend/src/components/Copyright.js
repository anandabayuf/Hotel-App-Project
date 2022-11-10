import { CCircleFill, HeartFill } from "react-bootstrap-icons";

export default function CopyRight() {
	const style = {
		text: {
			padding: "10px",
			color: "#3F72AF",
		},
	};

	return (
		<div className="text-center" style={style.text}>
			<span>
				Made with <HeartFill /> by Team 1 Juara Coding <CCircleFill />{" "}
				2022
			</span>
		</div>
	);
}
