import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	deleteUser,
	getAllUser,
	searchUser,
	updateUserStatus,
} from "../../api/Users";
import Loader from "../../components/Loader";
import UserListTable from "../../components/user-management/User-List-Table";
import NoData from "../../components/No-Data";
import Pagination from "../../components/Pagination";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";
import SearchBar from "../../components/Search-Bar";
import DeleteModal from "../../components/Delete-Modal";
import { handleExpiredToken } from "../../utils/Reusable-Function";

export default function UserListPage() {
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [currentIndex, setCurrentIndex] = useState(null);

	const [user, setUser] = useState({});

	const [search, setSearch] = useState({
		query: "",
		category: "username",
	});

	const [deleteModalState, setDeleteModalState] = useState(false);

	const [paginationState, setPaginationState] = useState({
		numOfRows: 5,
		currentPage: 1,
		totalPages: null,
		totalData: null,
	});

	const navigate = useNavigate();
	const location = useLocation();

	const getUsers = async () => {
		setIsFetching(true);
		const response = await getAllUser(
			paginationState.currentPage,
			paginationState.numOfRows
		);
		setIsFetching(false);
		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 200) {
			setUsers(response.data);
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
		getUsers();
		document.title = "Users List"; // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate("/management/users/create");
	};

	const handleChangeStatus = async (id, index) => {
		setIsLoading(true);
		setCurrentIndex(index);
		const response = await updateUserStatus(id);

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
			getUsers();
		} else {
			dispatch(
				showMessageToast({
					show: true,
					title: "Failed",
					message: response.message + ". " + response.detail || "",
				})
			);
		}

		setTimeout(() => {
			dispatch(hideMessageToast());
		}, 5000);
	};

	const handleUpdateUser = (id) => {
		navigate(`/management/users/update/${id}`);
	};

	const handleAfterCreateUser = () => {
		if (location.state) {
			dispatch(showMessageToast(location.state.toastState));
			window.history.replaceState({}, document.title);
			setTimeout(() => {
				dispatch(hideMessageToast());
			}, 5000);
		}
	};

	useEffect(() => {
		handleAfterCreateUser(); // eslint-disable-next-line
	}, []);

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			getUsers();
		}
		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		searchUsers();
	};

	const searchUsers = async () => {
		setIsFetching(true);
		const response = await searchUser(
			search.category,
			search.query,
			paginationState.currentPage,
			paginationState.numOfRows
		);

		setIsFetching(false);
		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 200) {
			setUsers(response.data);
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

	const handleClickDelete = (user, index) => {
		setUser(user);
		setCurrentIndex(index);

		setDeleteModalState(true);
	};

	const handleCloseDeleteModal = () => {
		setDeleteModalState(false);
	};

	const handleDelete = async () => {
		handleCloseDeleteModal();
		setIsLoading(true);
		const response = await deleteUser(user._id);

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
			getUsers();
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
			searchUsers();
		} else {
			getUsers();
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
						<h3 style={style.title}>User List</h3>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-primary shadow"
							style={style.button}
							onClick={() => handleClickCreate()}
						>
							Create User
						</button>
					</div>
				</div>
				<div className="mb-3">
					<SearchBar
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						for="users"
					>
						<option value="username">Username</option>
						<option value="role">Role</option>
						<option value="status">Status</option>
					</SearchBar>
				</div>
				{isFetching ? (
					<Loader />
				) : users.length > 0 ? (
					<>
						<UserListTable
							users={users}
							isLoading={isLoading}
							currentIndex={currentIndex}
							handleChangeStatus={handleChangeStatus}
							handleUpdateUser={handleUpdateUser}
							handleClickDelete={handleClickDelete}
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
					for="User"
					identifier="username"
				>
					<strong>{user.username}</strong>
				</DeleteModal>
			)}
		</div>
	);
}
