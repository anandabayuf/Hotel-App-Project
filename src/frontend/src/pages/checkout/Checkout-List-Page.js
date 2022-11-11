import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCheckout } from "../../api/Checkout";
import Loader from "../../components/Loader";
import CheckoutListTable from "../../components/checkout/Checkout-List-Table";
import NoData from "../../components/No-Data";
import DetailCheckoutModal from "../../components/checkout/Detail-Checkout-Modal";
import Pagination from "../../components/Pagination";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";
import SearchBar from "../../components/Search-Bar";

export default function CheckoutListPage() {
	const dispatch = useDispatch();
	const [checkouts, setCheckouts] = useState([]);
	const [checkoutsList, setCheckoutsList] = useState([]);

	const [isFetching, setIsFetching] = useState(false);

	const [search, setSearch] = useState({
		query: "",
		category: "roomNo",
	});

	const [detailModalState, setDetailModalState] = useState(false);

	const [checkOut, setCheckOut] = useState({});

	const [paginationState, setPaginationState] = useState({
		numOfRows: 5,
		currentPage: 1,
		totalPages: null,
		totalData: null,
	});

	const navigate = useNavigate();
	const location = useLocation();

	const getCheckouts = async () => {
		setIsFetching(true);
		const response = await getAllCheckout(
			paginationState.currentPage,
			paginationState.numOfRows
		);
		const data = await response.data;

		setIsFetching(false);
		if (response.status === 401) {
			navigate("/login", {
				state: {
					toastState: {
						show: true,
						title: "Session has expired",
						message: "Your session has expired, please login",
					},
				},
			});
		} else if (response.status === 200) {
			setCheckouts(data);
			setCheckoutsList(data);
			setPaginationState({
				...paginationState,
				totalPages: response.totalPages,
				totalData: response.totalData,
			});
		} else {
			dispatch(
				showMessageToast({
					show: true,
					title: "Failed",
					message: response.message,
				})
			);
			setTimeout(() => {
				dispatch(hideMessageToast());
			}, 5000);
		}
	};

	useEffect(() => {
		getCheckouts();
		document.title = "Check Out List"; // eslint-disable-next-line
	}, []);

	const handleClickDetail = (data) => {
		setCheckOut(data);
		setDetailModalState(true);
	};

	const handleCloseDetailModal = () => {
		setDetailModalState(false);
	};

	const handleAfterCheckout = () => {
		if (location.state) {
			dispatch(showMessageToast(location.state.toastState));
			window.history.replaceState({}, document.title);
			setTimeout(() => {
				dispatch(hideMessageToast());
			}, 5000);
		}
	};

	useEffect(() => {
		handleAfterCheckout(); // eslint-disable-next-line
	}, []);

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			setCheckoutsList(checkouts);
		}

		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = async (e) => {
		setIsFetching(true);
		e.preventDefault();
		const response = checkoutsList.filter(function (el) {
			let result = null;
			switch (search.category) {
				case "roomNo":
					result =
						el.checkIn.roomNo
							.toLowerCase()
							.indexOf(search.query.toLocaleLowerCase()) > -1;
					break;
				case "customerName":
					result =
						el.checkIn.customer.name
							.toLowerCase()
							.indexOf(search.query.toLocaleLowerCase()) > -1;
					break;
				case "customerId":
					result =
						el.checkIn.customer.ID.toLowerCase().indexOf(
							search.query.toLocaleLowerCase()
						) > -1;
					break;
				default:
					break;
			}

			return result;
		});

		setTimeout(() => {
			setIsFetching(false);
			setCheckoutsList(response);
		}, 1000);
	};

	const handleChangePaginationState = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setPaginationState({
			...paginationState,
			[key]: key === "numOfRows" ? parseInt(value) : value,
			currentPage: 1,
		});
	};

	const handleClickLeftPagination = () => {
		setPaginationState({
			...paginationState,
			currentPage: paginationState.currentPage - 1,
		});
	};

	const handleClickRightPagination = () => {
		setPaginationState({
			...paginationState,
			currentPage: paginationState.currentPage + 1,
		});
	};

	useEffect(() => {
		if (search.query !== "") {
			setCheckoutsList(checkouts);
		} else {
			getCheckouts();
		} //eslint-disable-next-line
	}, [paginationState.currentPage, paginationState.numOfRows]);

	const style = {
		page: {
			padding: "30px",
			paddingTop: "70px",
			backgroundColor: "#F9F7F7",
		},
		title: {
			color: "#112D4E",
		},
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<h3 style={style.title}>Check Out List</h3>
				<div className="mb-3">
					<SearchBar
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						for="check out"
					>
						<option value="roomNo">Room No</option>
						<option value="customerName">Customer Name</option>
						<option value="customerId">Customer ID</option>
					</SearchBar>
				</div>
				{isFetching ? (
					<Loader />
				) : checkoutsList.length > 0 ? (
					<>
						<CheckoutListTable
							checkouts={checkoutsList}
							handleClickDetail={handleClickDetail}
						/>
						<Pagination
							paginationState={paginationState}
							handleChangePaginationState={
								handleChangePaginationState
							}
							handleClickLeftPagination={
								handleClickLeftPagination
							}
							handleClickRightPagination={
								handleClickRightPagination
							}
						/>
					</>
				) : (
					<NoData />
				)}
			</div>
			{detailModalState && (
				<DetailCheckoutModal
					detailModalState={detailModalState}
					handleCloseDetailModal={handleCloseDetailModal}
					checkOut={checkOut}
					checkIn={checkOut.checkIn}
				/>
			)}
		</div>
	);
}
