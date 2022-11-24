export default function Loader() {
	const style = {
		loader: {
			color: "#3F72AF",
		},
	};

	return (
		<div className="text-center">
			<div className="spinner-border" role="status" style={style.loader}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}
