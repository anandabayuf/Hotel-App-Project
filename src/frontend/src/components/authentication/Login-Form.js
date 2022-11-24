import Loader from "../Loader";

export default function LoginForm(props) {
	const style = {
		label: {
			color: "#3F72AF",
		},
		input: {
			borderRadius: "10px",
			borderColor: "#DBE2EF",
			color: "#3F72AF",
		},
		button: {
			borderRadius: "15px",
			backgroundColor: "#3F72AF",
			color: "#F9F7F7",
		},
	};

	return (
		<form onSubmit={props.handleLogIn} className="mb-5">
			<div className="mb-3">
				<label
					htmlFor="username"
					className="form-label"
					style={style.label}
				>
					Username
				</label>
				<input
					type="text"
					className="form-control"
					id="username"
					name="username"
					style={style.input}
					value={props.credential.username || ""}
					onChange={props.handleChange}
					placeholder="input your username"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="password"
					className="form-label"
					style={style.label}
				>
					Password
				</label>
				<input
					type="password"
					className="form-control"
					id="password"
					name="password"
					autoComplete="on"
					style={style.input}
					value={props.credential.password || ""}
					onChange={props.handleChange}
					placeholder="input your password"
				/>
			</div>
			{props.isLoading ? (
				<Loader />
			) : (
				<div className="d-grid gap-2">
					<button
						type="submit"
						className="btn shadow"
						style={style.button}
						disabled={
							props.credential.username === "" ||
							props.credential.password === ""
						}
					>
						Log In
					</button>
				</div>
			)}
		</form>
	);
}
