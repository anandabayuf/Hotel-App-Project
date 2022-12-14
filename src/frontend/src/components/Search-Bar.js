export default function SearchBar(props) {
	const style = {
		input: {
			borderRadius: "10px",
			borderColor: "#DBE2EF",
			color: "#3F72AF",
		},
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<form onSubmit={props.handleSubmitSearch}>
			<div className="row justify-content-center align-items-center">
				<div className="col-auto">Search by:</div>
				<div className="col-auto">
					<select
						className="form-select"
						name="category"
						value={props.search.category}
						onChange={props.handleChangeSearch}
						style={style.input}
					>
						{props.children}
					</select>
				</div>
				<div className="col-6">
					<input
						className="form-control"
						type="text"
						id="query"
						name="query"
						value={props.search.query}
						onChange={props.handleChangeSearch}
						placeholder={`Search ${props.for} data`}
						style={style.input}
					/>
				</div>
				<div className="col-auto">
					<button
						type="submit"
						className="btn btn-outline-dark"
						style={style.button}
					>
						Search
					</button>
				</div>
			</div>
		</form>
	);
}
