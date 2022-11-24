import Bayu from "../../assets/bayu.jpg";
import Barkah from "../../assets/barkah.jpg";
import Rizka from "../../assets/rizka.jpg";
import Ivan from "../../assets/ivan.jpeg";
import PeopleAboutCard from "../../components/settings/People-About-Card";

export default function AboutUs() {
	const people = [
		{
			name: "Ananda Bayu Fauzan",
			img: Bayu,
			email: "anandabayu090@gmail.com",
			phone: "+62 812-2172-3798",
			wa: "https://wa.me/+6281221723798",
			github: "https://github.com/anandabayuf",
		},
		{
			name: "Barkah Suhandi",
			img: Barkah,
			email: "Barkahsuhandii@gmail.com",
			phone: "+62 898-6680-125",
			wa: "https://wa.me/+628986680125",
			github: "https://github.com/barkahsuhandii",
		},
		{
			name: "Ivan Apriana",
			img: Ivan,
			email: "ivanapriana128@gmail.com",
			phone: "+62 813-1462-4973",
			wa: "https://wa.me/+6281314624973",
			github: "https://github.com/ivan12812",
		},
		{
			name: "Rizka Agustin",
			img: Rizka,
			email: "Rizkaagustin02@gmail.com",
			phone: "+62 851-5654-8788",
			wa: "https://wa.me/+6285156548788",
			github: "https://github.com/RizkaAgustin",
		},
	];

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
					About Us
				</h3>
				<p className="mb-3 text-center lead" style={style.title}>
					Team 1 - Juara Coding - MERN Javascript Batch 13
				</p>
				<div className="row gy-3">
					{people.map((p, index) => {
						return (
							<div className="col-6" key={index}>
								<PeopleAboutCard people={p} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
