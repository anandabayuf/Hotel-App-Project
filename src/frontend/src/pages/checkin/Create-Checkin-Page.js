import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCheckin } from "../../api/Checkin";
import { getAvailableRooms } from "../../api/Room";
import CreateCheckinForm from "../../components/checkin/Create-Checkin-Form";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";
import { handleExpiredToken } from "../../utils/Reusable-Function";

export default function CreateCheckinPage() {
	const dispatch = useDispatch();
	const [checkin, setCheckin] = useState({
		lengthOfStay: 0,
		totalCost: "",
		downPayment: 0,
		remains: "",
		change: "",
		dueDate: new Date(),
	});

	const [customer, setCustomer] = useState({
		name: "",
		ID: "",
		address: "",
		phoneNumber: "",
	});

	const [selectedRoom, setSelectedRoom] = useState({
		roomNo: "",
		room: null,
	});

	const [rooms, setRooms] = useState([]);

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const getRooms = async () => {
		setIsFetching(true);
		const response = await getAvailableRooms();

		setIsFetching(false);
		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 200) {
			setRooms(response.data);
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
		document.title = "Create Check In"; // eslint-disable-next-line
	}, []);

	const handleChangeCheckin = (e) => {
		const key = e.target.name;
		let value = null;
		let dueDate = new Date();

		if (key === "lengthOfStay") {
			value = parseInt(e.target.value);
			dueDate.setDate(dueDate.getDate() + (value || 0));
			dueDate.setHours(12, 0, 0, 0, 0);

			setCheckin({
				...checkin,
				[key]: isNaN(value) ? 0 : value,
				dueDate: dueDate,
			});
		} else if (key === "downPayment") {
			value = parseInt(e.target.value);
			setCheckin({
				...checkin,
				[key]: isNaN(value) ? 0 : value,
			});
		} else {
			value = e.target.value;
			setCheckin({
				...checkin,
				[key]: value,
			});
		}
	};

	const handleChangeCustomer = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setCustomer({
			...customer,
			[key]: value,
		});
	};

	const handleChangeRoom = (e) => {
		const room = rooms.filter((el) => el.roomNo === e.target.value)[0];

		if (room) {
			setSelectedRoom({
				...selectedRoom,
				roomNo: e.target.value,
				room: room,
			});
		} else {
			setSelectedRoom({
				plateNo: "",
				room: null,
			});
		}
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		let { dueDate, ...payload } = checkin;

		payload["totalCost"] = selectedRoom.room.price * payload.lengthOfStay;

		if (payload["totalCost"] > payload["downPayment"]) {
			payload["change"] = 0;
			payload["remains"] = payload["totalCost"] - payload["downPayment"];
		} else if (payload["totalCost"] < payload["downPayment"]) {
			payload["change"] = payload["downPayment"] - payload["totalCost"];
			payload["remains"] = 0;
		} else {
			payload["change"] = 0;
			payload["remains"] = 0;
		}

		payload["customer"] = customer;
		payload["roomNo"] = selectedRoom.roomNo;
		payload["roomId"] = selectedRoom.room._id;

		const response = await createCheckin(payload);

		setIsLoading(false);
		if (response.status === 401) {
			handleExpiredToken(navigate);
		} else if (response.status === 201) {
			navigate("/transaction/checkin", {
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
					Create Check In Transaction
				</h3>
				<CreateCheckinForm
					rooms={rooms}
					checkin={checkin}
					customer={customer}
					selectedRoom={selectedRoom}
					isLoading={isLoading}
					isFetching={isFetching}
					handleChangeCustomer={handleChangeCustomer}
					handleChangeCheckin={handleChangeCheckin}
					handleChangeRoom={handleChangeRoom}
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
				/>
			</div>
		</div>
	);
}
