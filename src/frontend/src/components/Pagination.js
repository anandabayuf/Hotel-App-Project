import {
	CaretLeft,
	CaretLeftFill,
	CaretRight,
	CaretRightFill,
} from "react-bootstrap-icons";

export default function Pagination(props) {
	return (
		<div className="row justify-content-end align-items-center">
			<div className="row justify-content-end align-items-center">
				<div className="col-auto">
					<label className="form-label">Rows per page: </label>
				</div>
				<div className="col-auto">
					<select
						className="form-select"
						style={props.style.input}
						name="numOfRows"
						value={props.paginationState.numOfRows.toString()}
						onChange={props.handleChangePaginationState}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
				<div className="col-auto">
					{props.paginationState.currentPage *
						props.paginationState.numOfRows -
						props.paginationState.numOfRows +
						1}
					-
					{props.paginationState.currentPage ===
					props.paginationState.totalPages
						? props.paginationState.totalData
						: props.paginationState.currentPage *
						  props.paginationState.numOfRows}{" "}
					of {props.paginationState.totalData}
				</div>
				<div className="col-auto">
					<button
						className="btn"
						style={props.style.iconButton}
						disabled={props.paginationState.currentPage === 1}
						onClick={() => props.handleClickLeftPagination()}
					>
						{props.paginationState.currentPage === 1 ? (
							<CaretLeft size={16} style={props.style.label} />
						) : (
							<CaretLeftFill
								size={16}
								style={props.style.label}
							/>
						)}
					</button>
				</div>
				<div className="col-auto">
					<button
						className="btn"
						style={props.style.iconButton}
						disabled={
							props.paginationState.currentPage ===
							props.paginationState.totalPages
						}
						onClick={() => props.handleClickRightPagination()}
					>
						{props.paginationState.currentPage ===
						props.paginationState.totalPages ? (
							<CaretRight size={16} style={props.style.label} />
						) : (
							<CaretRightFill
								size={16}
								style={props.style.label}
							/>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
