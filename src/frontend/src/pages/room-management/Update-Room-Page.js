import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../../api/Room";
import Loader from "../../components/Loader";
import UpdateRoomForm from "../../components/room-management/Update-Room-Form";
import { useDispatch } from "react-redux";
import {
	showMessageToast,
	hideMessageToast,
} from "../../store/actions/Message-Toast-Action";

export default function UpdateRoomPage() {
	const dispatch = useDispatch();
	const [room, setRoom] = useState({
		roomNo: "",
		type: "Standard",
		price: "",
		facility: "",
		pictureFromDB: undefined,
		isEditPicture: false,
		picture: undefined,
	});

	const [picPreview, setPicPreview] = useState("");

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const getRoomData = async () => {
		setIsFetching(true);
		const response = await getRoomById(id);

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
			let data = await response.data;

			data["pictureFromDB"] = data.picture;

			data["picture"] = undefined;

			setRoom(data);
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
		getRoomData();
		document.title = "Update Room"; // eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		const key = e.target.name;
		let value = "";

		if (key === "picture") {
			value = e.target.files[0];

			setRoom({
				...room,
				[key]: value,
			});
		} else if (key === "isEditPicture") {
			value = e.target.checked;

			if (!value) {
				setRoom({
					...room,
					[key]: value,
					picture: undefined,
				});
				setPicPreview(undefined);
			} else {
				setRoom({
					...room,
					[key]: value,
				});
			}
		} else {
			value = e.target.value;

			setRoom({
				...room,
				[key]: value,
			});
		}
	};

	useEffect(() => {
		if (!room.picture) {
			setPicPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(room.picture);
		setPicPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [room.picture]);

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		let { isEditPicture, pictureFromDB, picture, ...data } = room;

		if (isEditPicture) {
			data["picture"] = picture;
		}

		const response = await updateRoom(id, data);

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
			navigate("/management/rooms", {
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
		navigate("/management/rooms");
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
					Update Room
				</h3>
				{isFetching ? (
					<Loader />
				) : (
					<UpdateRoomForm
						room={room}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						isLoading={isLoading}
						handleCancel={handleCancel}
						picPreview={picPreview}
					/>
				)}
			</div>
		</div>
	);
}
