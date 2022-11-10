import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { logIn } from "../../api/Authentication";
import { useNavigate } from "react-router-dom";
import MessageToast from "../../components/Message-Toast";
import LoginForm from "../../components/authentication/Login-Form";
import CopyRight from "../../components/Copyright";
import LoginIllustration from "../../components/authentication/Login-Illustration";

export default function LoginPage() {
	const [credential, setCredential] = useState({
		username: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const navigate = useNavigate();
	const location = useLocation();

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setCredential({
			...credential,
			[key]: value,
		});
	};

	const handleLogIn = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const response = await logIn(credential);

		setIsLoading(false);
		if (response.token) {
			localStorage.setItem("TOKEN", `JWT ${response.token}`);
			navigate("/transaction/checkin");
		} else {
			setToastState({
				...toastState,
				show: true,
				title: response.message,
				message: response.detail,
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

	const handleNotification = () => {
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
		handleNotification();
		document.title = "Log In"; // eslint-disable-next-line
	}, []);

	const style = {
		page: {
			padding: "30px",
			backgroundColor: "#F9F7F7",
		},
		container: {
			width: "auto",
			padding: "30px",
			borderRadius: "30px",
		},
		title: {
			color: "#112D4E",
		},
	};

	return (
		<div
			className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
			style={style.page}
		>
			<div className="row align-items-center" style={style.container}>
				<div className="col-md-7 col-sm-12">
					<LoginIllustration />
				</div>
				<div className="col-md-5 col-sm-12">
					<h3 className="mb-md-5 mb-sm-3" style={style.title}>
						Log In Hotel Information System
					</h3>
					<LoginForm
						credential={credential}
						isLoading={isLoading}
						handleChange={handleChange}
						handleLogIn={handleLogIn}
					/>
					<CopyRight />
				</div>
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}
