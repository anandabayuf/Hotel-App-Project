import { useEffect, useState } from "react";
import {
	deleteRoom,
	getAllRooms,
	searchRoom,
	updateRoomStatus,
} from "../../api/Room";
import SearchBarRoom from "../../components/room-management/Search-Bar-Room";
import RoomListTable from "../../components/room-management/Room-List-Table";
import NoData from "../../components/No-Data";
import Loader from "../../components/Loader";
import DeleteRoomModal from "../../components/room-management/Delete-Room-Modal";
import MessageToast from "../../components/Message-Toast";
import { useNavigate, useLocation } from "react-router-dom";
import DetailRoomModal from "../../components/room-management/Detail-Room-Modal";
import Pagination from "../../components/Pagination";

export default function RoomListPage() {
	const [rooms, setRooms] = useState([]);

	const [currentIndex, setCurrentIndex] = useState(null);
	const [room, setRoom] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [isFetching, setIsFetching] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const [search, setSearch] = useState({
		query: "",
		category: "roomNo",
	});

	const [deleteRoomModalState, setDeleteRoomModalState] = useState(false);
	const [detailRoomModalState, setDetailRoomModalState] = useState(false);

	const [paginationState, setPaginationState] = useState({
		numOfRows: 5,
		currentPage: 1,
		totalPages: null,
		totalData: null,
	});

	const navigate = useNavigate();
	const location = useLocation();

	const getRooms = async () => {
		setIsFetching(true);
		const response = await getAllRooms(
			paginationState.currentPage,
			paginationState.numOfRows
		);
		console.log(response);

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
			setRooms(response.data);
			setPaginationState({
				...paginationState,
				totalPages: response.totalPages,
				totalData: response.totalData,
			});
		} else {
			setToastState({
				show: true,
				title: "Failed",
				message: response.message,
			});

			setTimeout(() => {
				setToastState({
					show: false,
					title: "",
					message: "",
				});
			}, 5000);
		}
	};

	useEffect(() => {
		getRooms();
		document.title = "Rooms List"; // eslint-disable-next-line
	}, []);

	const handleChangeStatus = async (id, index) => {
		setIsLoading(true);
		setCurrentIndex(index);
		const response = await updateRoomStatus(id);

		setIsLoading(false);
		setCurrentIndex(null);

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
			setToastState({
				show: true,
				title: "Success",
				message: response.message,
			});
			getRooms();
		} else {
			setToastState({
				show: true,
				title: "Failed",
				message: response.message,
			});
		}

		setTimeout(() => {
			setToastState({
				show: false,
				title: "",
				message: "",
			});
		}, 5000);
	};

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			getRooms();
		}
		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		searchRooms();
	};

	const searchRooms = async () => {
		setIsFetching(true);

		const response = await searchRoom(
			search.category,
			search.query,
			paginationState.currentPage,
			paginationState.numOfRows
		);
		console.log(response);

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
			setRooms(response.data);
			setPaginationState({
				...paginationState,
				totalPages: response.totalPages,
				totalData: response.totalData,
			});
		} else {
			setToastState({
				...toastState,
				show: true,
				title: "Failed",
				message: response.message,
			});
			setTimeout(() => {
				setToastState({
					...toastState,
					show: false,
					title: "",
					message: "",
				});
			}, 5000);
		}
	};

	const handleClickDelete = (room, index) => {
		setRoom(room);
		setDeleteRoomModalState(true);
		setCurrentIndex(index);
	};

	const handleDeleteRoom = async (id) => {
		setIsLoading(true);
		const response = await deleteRoom(id);

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
		} else if (response.status === 204) {
			setToastState({
				show: true,
				title: "Success",
				message: response.message,
			});
			getRooms();
		} else {
			setToastState({
				show: true,
				title: "Failed",
				message: response.message,
			});
		}

		setTimeout(() => {
			setToastState({
				show: false,
				title: "",
				message: "",
			});
		}, 5000);
	};

	const handleClickCreate = () => {
		navigate("/management/rooms/create");
	};

	const handleAfterCreateRoom = () => {
		if (location.state) {
			setToastState(location.state.toastState);
			window.history.replaceState({}, document.title);
			setTimeout(() => {
				setToastState({
					...toastState,
					show: false,
					title: "",
					message: "",
				});
			}, 5000);
		}
	};

	useEffect(() => {
		handleAfterCreateRoom(); // eslint-disable-next-line
	}, []);

	const handleClickDetail = (room) => {
		setRoom(room);
		setDetailRoomModalState(true);
	};

	const handleClickUpdate = (id) => {
		navigate(`/management/rooms/update/${id}`);
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
			searchRooms();
		} else {
			getRooms();
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
		label: {
			color: "#3F72AF",
		},
		input: {
			borderRadius: "10px",
			borderColor: "#DBE2EF",
			color: "#3F72AF",
		},
		card: {
			border: "none",
			borderRadius: "20px",
		},
		button: {
			borderRadius: "15px",
		},
		loader: {
			color: "#3F72AF",
		},
		iconButton: {
			borderColor: "#3F72AF",
			borderRadius: "50px",
		},
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<div className="row justify-content-between mb-3">
					<div className="col-auto">
						<h3 style={style.title}>Room Management</h3>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-primary shadow"
							style={style.button}
							onClick={() => handleClickCreate()}
						>
							Create Room
						</button>
					</div>
				</div>
				<div className="mb-3">
					<SearchBarRoom
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						style={style}
					/>
				</div>
				{isFetching ? (
					<Loader style={style} />
				) : rooms.length > 0 ? (
					<>
						<RoomListTable
							rooms={rooms}
							isLoading={isLoading}
							currentIndex={currentIndex}
							handleChangeStatus={handleChangeStatus}
							handleClickDelete={handleClickDelete}
							handleClickDetail={handleClickDetail}
							handleClickUpdate={handleClickUpdate}
						/>
						<Pagination
							style={style}
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
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
			{deleteRoomModalState && (
				<DeleteRoomModal
					deleteRoomModalState={deleteRoomModalState}
					setDeleteRoomModalState={setDeleteRoomModalState}
					room={room}
					handleDeleteRoom={handleDeleteRoom}
					style={style}
				/>
			)}
			{detailRoomModalState && (
				<DetailRoomModal
					detailRoomModalState={detailRoomModalState}
					setDetailRoomModalState={setDetailRoomModalState}
					room={room}
				/>
			)}
		</div>
	);
}
