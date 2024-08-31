import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import UserForm from "./UserForm/UserForm";
import UserView from "./UserView/UserView";
import "./Users.scss";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Users() {
	const [users] = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div id="users_container">
			<h2>Users</h2>
			<button onClick={handleOpen}>Create User</button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<h1>Create User</h1>
						<UserForm close={handleClose} />
					</Box>
				</Fade>
			</Modal>
			<div id="table_container">
				<table id="products_table">
					<tr>
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Usersname</th>
						<th>Email</th>
						<th>Password</th>
						<th>Picture</th>
						<th>Edit</th>
					</tr>
					{users.map((user, index) => {
						return <UserView key={index} data={user} />;
					})}
				</table>
			</div>
		</div>
	);
}

export default Users;
