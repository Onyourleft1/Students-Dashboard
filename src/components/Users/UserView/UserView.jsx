import React, { useContext, useEffect, useState } from "react";
import "./UserView.scss";
import { UserContext } from "../../../App";
import axios from "axios";

function UserView(props) {
	const user = props.data;
	const [, , getUsers] = useContext(UserContext);
	const [editable, setEditable] = useState(false);
	const [first_name, setFName] = useState(user.first_name);
	const [last_name, setLName] = useState(user.last_name);
	const [username, setUName] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [image, setImage] = useState("");

	const handleFName = (e) => {
		setFName(e.target.value);
	};
	const handleLName = (e) => {
		setLName(e.target.value);
	};
	const handleUName = (e) => {
		setUName(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const save = () => {
		axios
			.patch(`${process.env.REACT_APP_BACK_URL}/Users/update`, {
				id: user.id,
				first_name: first_name,
				last_name: last_name,
				username: username,
				email: email,
				password: password,
			})
			.then((response) => {
				getUsers();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const toggle = () => {
		if (editable) {
			setEditable(false);
			save();
		}
		if (!editable) {
			setEditable(true);
		}
	};

	const del = (id) => {
		axios
			.delete(`${process.env.REACT_APP_BACK_URL}/Users/delete/${id}`)
			.then(() => {
				getUsers();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACK_URL}/UsersFiles/get/${user.id}`, {
				responseType: "blob",
			})
			.then((response) => {
				const imageUrl = URL.createObjectURL(response.data);
				setImage(imageUrl);
			})
			.catch((err) => {
				console.error(err.response);
			});
	}, [user.id]);

	return (
		<tr id="userView_container">
			<td>{user.id}</td>
			<td>{editable ? <input onChange={handleFName} /> : user.first_name}</td>
			<td>{editable ? <input onChange={handleLName} /> : user.last_name}</td>
			<td>{editable ? <input onChange={handleUName} /> : user.username}</td>
			<td>{editable ? <input onChange={handleEmail} /> : user.email}</td>
			<td> {editable ? <input onChange={handlePassword} /> : user.password}</td>
			<td>
				<img id="user_img" src={image} alt="test" />
				{/* <a href={image} download={"download.jpg"}>
					<button>Download</button>
				</a> */}
			</td>
			<td id="edit">
				<button onClick={toggle}>{editable ? "Save" : "Edit"}</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						del(user.id);
					}}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default UserView;
