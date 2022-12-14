import { useEffect, useState } from "react";
import {
	deleteRoom,
	getAllRooms,
	searchRoom,
	updateRoomStatus,
} from "../../api/Room";
import RoomListTable from "../../components/room-management/Room-List-Table";
import NoData from "../../components/No-Data";
import Loader from "../../components/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";
import SearchBar from "../../components/Search-Bar";
import DeleteModal from "../../components/Delete-Modal";
import DetailRoomModal from "../../components/room-management/Detail-Room-Modal";
import { handleExpiredToken } from "../../utils/Reusable-Function";

export default function RoomListPage() {
	const dispatch = useDispatch();
	const [rooms, setRooms] = useState([]);

	const [currentIndex, setCurrentIndex] = useState(null);
	const [room, setRoom] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [isFetching, setIsFetching] = useState(false);

	const [search, setSearch] = useState({
		query: "",
		category: "roomNo",
	});

	const [deleteModalState, setDeleteModalState] = useState(false);
	const [detailModalState, setDetailModalState] = useState(false);

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

		setIsFetching(false);
		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 200) {
			setRooms(response.data);
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
			handleExpiredToken(navigate);
		} else if (response.status === 201) {
			dispatch(
				showMessageToast({
					show: true,
					title: "Success",
					message: response.message,
				})
			);
			getRooms();
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

		setIsFetching(false);
		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 200) {
			setRooms(response.data);
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

	const handleClickDelete = (room, index) => {
		setRoom(room);
		setDeleteModalState(true);
		setCurrentIndex(index);
	};

	const handleCloseDeleteModal = () => {
		setDeleteModalState(false);
	};

	const handleDelete = async () => {
		handleCloseDeleteModal();
		setIsLoading(true);
		const response = await deleteRoom(room._id);

		setIsLoading(false);

		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 204) {
			dispatch(
				showMessageToast({
					show: true,
					title: "Success",
					message: response.message,
				})
			);
			getRooms();
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

	const handleClickCreate = () => {
		navigate("/management/rooms/create");
	};

	const handleAfterCreateRoom = () => {
		if (location.state) {
			dispatch(showMessageToast(location.state.toastState));
			window.history.replaceState({}, document.title);
			setTimeout(() => {
				dispatch(hideMessageToast());
			}, 5000);
		}
	};

	useEffect(() => {
		handleAfterCreateRoom(); // eslint-disable-next-line
	}, []);

	const handleClickDetail = (room) => {
		setRoom(room);
		setDetailModalState(true);
	};

	const handleCloseDetailModal = () => {
		setDetailModalState(false);
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
		button: {
			borderRadius: "15px",
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
					<SearchBar
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						for="rooms"
					>
						<option value="roomNo">Room Number</option>
						<option value="status">Status</option>
					</SearchBar>
				</div>
				{isFetching ? (
					<Loader />
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
			{deleteModalState && (
				<DeleteModal
					deleteModalState={deleteModalState}
					setDeleteModalState={setDeleteModalState}
					handleClose={handleCloseDeleteModal}
					handleDelete={handleDelete}
					for="Room"
					identifier="room no"
				>
					<strong>{room.roomNo}</strong>
				</DeleteModal>
			)}
			{detailModalState && (
				<DetailRoomModal
					detailModalState={detailModalState}
					handleCloseDetailModal={handleCloseDetailModal}
					room={room}
				/>
			)}
		</div>
	);
}
