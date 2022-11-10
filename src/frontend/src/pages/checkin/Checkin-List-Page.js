import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import NoData from "../../components/No-Data";
import {
	getAllCheckins,
	searchCheckin,
	updateCheckinStatus,
} from "../../api/Checkin";
import SearchBarCheckin from "../../components/checkin/Search-Bar-Checkin";
import CheckinListTable from "../../components/checkin/Checkin-List-Table";
import DetailCheckinModal from "../../components/checkin/Detail-Checkin-Modal";
import UpdateCheckinStatusModal from "../../components/checkin/Update-Checkin-Status-Modal";
import Pagination from "../../components/Pagination";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";

export default function CheckinListPage() {
	const dispatch = useDispatch();
	const [checkins, setCheckins] = useState([]);

	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const [search, setSearch] = useState({
		query: "",
		category: "roomNo",
	});

	const [openDetailCheckinModal, setOpenDetailCheckinModal] = useState(false);
	const [updateCheckinStatusModalState, setUpdateCheckinStatusModalState] =
		useState(false);

	const [checkin, setCheckin] = useState({});
	const [currentIndex, setCurrentIndex] = useState(null);

	const [paginationState, setPaginationState] = useState({
		numOfRows: 5,
		currentPage: 1,
		totalPages: null,
		totalData: null,
	});

	const navigate = useNavigate();
	const location = useLocation();

	const getCheckins = async () => {
		setIsFetching(true);
		const response = await getAllCheckins(
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
			setCheckins(data);
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
		getCheckins();
		document.title = "Check In List"; // eslint-disable-next-line
	}, []);

	const handleClickDetail = (data) => {
		setCheckin(data);
		setOpenDetailCheckinModal(true);
	};

	const handleAfterCheckIn = () => {
		if (location.state) {
			dispatch(showMessageToast(location.state.toastState));
			window.history.replaceState({}, document.title);
			setTimeout(() => {
				dispatch(hideMessageToast());
			}, 5000);
		}
	};

	useEffect(() => {
		handleAfterCheckIn(); // eslint-disable-next-line
	}, []);

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			getCheckins();
		}

		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		searchCheckIns();
	};

	const searchCheckIns = async () => {
		setIsFetching(true);
		const response = await searchCheckin(
			search.category,
			search.query,
			paginationState.currentPage,
			paginationState.numOfRows
		);

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
			setCheckins(response.data);
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

	const handleClikCreate = () => {
		navigate("/transaction/checkin/create");
	};

	const handleClickUpdateStatus = (checkin, index) => {
		setCheckin(checkin);
		setCurrentIndex(index);

		setUpdateCheckinStatusModalState(true);
	};

	const handleCheckout = () => {
		navigate(`/transaction/checkout/${checkin._id}`);
	};

	const handleUpdateStatus = async () => {
		setIsLoading(true);
		const response = await updateCheckinStatus(checkin._id);

		setIsLoading(false);
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
		} else if (response.status === 201) {
			dispatch(
				showMessageToast({
					show: true,
					title: "Success",
					message: response.message,
				})
			);
			getCheckins();
		} else {
			dispatch(
				showMessageToast({
					show: true,
					title: "Failed",
					message: response.message,
				})
			);
		}

		setTimeout(() => {
			dispatch(hideMessageToast());
		}, 5000);
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
			searchCheckIns();
		} else {
			getCheckins();
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
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<div className="row justify-content-between mb-3">
					<div className="col-auto">
						<h3 style={style.title}>Checkin List</h3>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-primary shadow"
							style={style.button}
							onClick={() => handleClikCreate()}
						>
							Create Check In
						</button>
					</div>
				</div>
				<div className="mb-3">
					<SearchBarCheckin
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
					/>
				</div>
				{isFetching ? (
					<Loader />
				) : checkins.length > 0 ? (
					<>
						<CheckinListTable
							checkins={checkins}
							handleClickDetail={handleClickDetail}
							handleClickUpdateStatus={handleClickUpdateStatus}
							currentIndex={currentIndex}
							isLoading={isLoading}
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
			{openDetailCheckinModal && (
				<DetailCheckinModal
					openDetailCheckinModal={openDetailCheckinModal}
					setOpenDetailCheckinModal={setOpenDetailCheckinModal}
					checkIn={checkin}
					room={checkin.room}
				/>
			)}
			{updateCheckinStatusModalState && (
				<UpdateCheckinStatusModal
					updateCheckinStatusModalState={
						updateCheckinStatusModalState
					}
					setUpdateCheckinStatusModalState={
						setUpdateCheckinStatusModalState
					}
					checkin={checkin}
					handleCheckout={handleCheckout}
					handleUpdateStatus={handleUpdateStatus}
				/>
			)}
		</div>
	);
}
