import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCheckinById } from "../../api/Checkin";
import { createCheckout } from "../../api/Checkout";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";
import CreateCheckoutForm from "../../components/checkout/Create-Checkout-Form";

export default function CreateCheckoutPage() {
	const dispatch = useDispatch();
	const [checkOut, setCheckOut] = useState({
		totalPrice: "",
		repayment: "",
		change: "",
		remains: "",
		late: {
			isLate: false,
			information: "",
			fine: "",
		},
	});

	const [checkIn, setCheckIn] = useState({});
	const [customer, setCustomer] = useState({});

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const getCheckIn = async () => {
		setIsFetching(true);
		const response = await getCheckinById(id);

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
			setCheckIn(response.data);
			setCustomer(response.data.customer);
			setCheckOut({
				...checkOut,
				totalPrice: response.data.totalCost,
				remains: response.data.remains,
			});
		} else {
			navigate("/transaction/checkin", {
				state: {
					toastState: {
						show: true,
						title: "Failed",
						message: response.message,
					},
				},
			});
		}
	};

	useEffect(() => {
		getCheckIn();
		document.title = "Create Check Out"; // eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		const key = e.target.name;
		let value = null;

		if (key === "isLate") {
			value = e.target.checked;

			if (!value) {
				setCheckOut({
					...checkOut,
					totalPrice: checkIn.totalCost,
					remains: 0,
					late: {
						...checkOut.late,
						isLate: value,
						fine: 0,
						information: "No Information",
					},
				});
			} else {
				setCheckOut({
					...checkOut,
					late: {
						...checkOut.late,
						isLate: value,
					},
				});
			}
		} else if (key === "repayment") {
			value = parseInt(e.target.value);

			setCheckOut({
				...checkOut,
				[key]: value || 0,
				change: (value || 0) - checkOut.remains,
			});
		} else if (key === "information") {
			value = e.target.value;

			setCheckOut({
				...checkOut,
				late: {
					...checkOut.late,
					[key]: value,
				},
			});
		} else if (key === "fine") {
			value = parseInt(e.target.value);

			setCheckOut({
				...checkOut,
				totalPrice: checkIn.totalCost + (value || 0),
				remains: checkIn.remains + (value || 0),
				late: {
					...checkOut.late,
					[key]: value || 0,
				},
			});
		}
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		let { remains, ...rest } = checkOut;
		rest["checkInId"] = checkIn._id;
		rest["roomId"] = checkIn.roomId;

		if (!rest["late"]["isLate"]) {
			rest["late"]["information"] = "Is Not Late";
			rest["late"]["fine"] = 0;
		}

		const response = await createCheckout(rest);

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
			navigate("/transaction/checkout", {
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
		navigate("/transaction/checkin");
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
					Check Out
				</h3>
				{isFetching ? (
					<Loader />
				) : (
					checkIn &&
					customer && (
						<CreateCheckoutForm
							checkOut={checkOut}
							customer={customer}
							checkIn={checkIn}
							isLoading={isLoading}
							handleChange={handleChange}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					)
				)}
			</div>
		</div>
	);
}
