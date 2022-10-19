import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUser, updateUserStatus } from "../../api/Users";
import Loader from "../../components/Loader";
import MessageToast from "../../components/Message-Toast";
import UserListTable from "../../components/user-management/User-List-Table";
import NoData from "../../components/No-Data";

export default function UserListPage() {
	const [users, setUsers] = useState([]);

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [currentIndex, setCurrentIndex] = useState(null);

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const navigate = useNavigate();
	const location = useLocation();

	const getUsers = async () => {
		setIsFetching(true);
		const response = await getAllUser();

		setTimeout(() => {
			setIsFetching(false);
			if (response.status === 200) {
				setUsers(response.data);
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
		}, 1000);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const handleClickCreate = () => {
		navigate("/management/users/create");
	};

	const handleChangeStatus = async (id, index) => {
		setIsLoading(true);
		setCurrentIndex(index);
		const response = await updateUserStatus(id);

		setTimeout(() => {
			setIsLoading(false);
			setCurrentIndex(null);

			if (response.status === 200) {
				setToastState({
					show: true,
					title: "Success",
					message: response.message,
				});
				getUsers();
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
		}, 1000);
	};

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
		loader: {
			color: "#3F72AF",
		},
		card: {
			border: "none",
			borderRadius: "20px",
		},
		button: {
			borderRadius: "20px",
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
							className="btn btn-outline-primary shadow"
							style={style.button}
							onClick={() => handleClickCreate()}
						>
							Create User
						</button>
					</div>
				</div>
				{isFetching ? (
					<Loader style={style} />
				) : users.length > 0 ? (
					<UserListTable
						users={users}
						isLoading={isLoading}
						currentIndex={currentIndex}
						handleChangeStatus={handleChangeStatus}
					/>
				) : (
					<NoData />
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}
