import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUserById } from "../../api/Users";
import Loader from "../../components/Loader";
import UpdateUserForm from "../../components/user-management/Update-User-Form";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";

export default function UpdateUserPage() {
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		name: "",
		role: "",
		username: "",
		password: "",
		isEditPassword: false,
	});

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const getUser = async () => {
		setIsFetching(true);

		const response = await getUserById(id);

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
			setUser({
				...user,
				...response.data,
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
		getUser();
		document.title = "Update User"; // eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		const key = e.target.name;
		let value = null;

		if (key === "isEditPassword") {
			value = e.target.checked;
		} else {
			value = e.target.value;
		}

		setUser({
			...user,
			[key]: value,
		});
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		let { isEditPassword, password, ...payload } = user;

		if (isEditPassword) {
			payload["password"] = password;
		}

		const response = await updateUser(id, payload);

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
			navigate("/management/users", {
				state: {
					toastState: {
						show: true,
						title: "Success",
						message: response.message,
					},
				},
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

	const handleCancel = () => {
		navigate("/management/users");
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
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<h3 className="mb-3" style={style.title}>
					Update User
				</h3>
				{isFetching ? (
					<Loader />
				) : (
					<UpdateUserForm
						user={user}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						isLoading={isLoading}
						handleCancel={handleCancel}
					/>
				)}
			</div>
		</div>
	);
}
