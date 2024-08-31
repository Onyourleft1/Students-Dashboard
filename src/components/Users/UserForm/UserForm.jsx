import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import "./UserForm.scss";

function UserForm(props) {
	const close = props.close;
	const [, , getUsers] = useContext(UserContext);
	const [first_name, setFName] = useState("");
	const [last_name, setLName] = useState("");
	const [username, setUName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [picture, setPicture] = useState(null);

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
	const handleFileUpload = (event) => {
		// get the selected file from the input
		const file = event.target.files[0];
		// create a new FormData object and append the file to it
		// const formData = new FormData();
		// setPicture(formData.append("file", file));
		setPicture(file);
	};

	const create = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("first_name", first_name);
		formData.append("last_name", last_name);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("picture", picture);

		axios
			.post(`${process.env.REACT_APP_BACK_URL}/Users/create`, formData)
			.then(() => {
				getUsers();
				close();
			})
			.catch((err) => {
				console.error(err.response);
			});
	};

	return (
		<form id="usersform_container" onSubmit={create}>
			<input onChange={handleFName} type="text" placeholder="First Name" />
			<input onChange={handleLName} type="text" placeholder="Last Name" />
			<input onChange={handleUName} type="text" placeholder="Username" />
			<input onChange={handleEmail} type="email" placeholder="Email" />
			<input onChange={handlePassword} type="text" placeholder="Password" />
			<input type="file" onChange={handleFileUpload} />
			<button type="submit">Submit</button>
		</form>
	);
}

export default UserForm;
