import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreteUserForm from "../../components/user-management/Create-User-Form";
import { createUser } from "../../api/Users";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";
import { handleExpiredToken } from "../../utils/Reusable-Function";

export default function CreateUserPage() {
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		name: "",
		role: "Receptionist",
		username: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setUser({
			...user,
			[key]: value,
		});
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const response = await createUser(user);

		setIsLoading(false);

		if (response.status === 401) {
			handleExpiredToken(navigate);
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

	useEffect(() => {
		document.title = "Create User";
	}, []);

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
					Create User
				</h3>
				<CreteUserForm
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
					handleCancel={handleCancel}
				/>
			</div>
		</div>
	);
}
