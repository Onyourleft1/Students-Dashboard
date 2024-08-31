import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div id="header_container">
			<Link to={"/"}>Home</Link>
			<Link to={"/products"}>Products</Link>
			<Link to={"/users"}>Users</Link>
			<Link to={"/front"}>Front</Link>
		</div>
	);
}

export default Header;
