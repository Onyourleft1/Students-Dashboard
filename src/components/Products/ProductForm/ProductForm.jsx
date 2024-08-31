import React, { useContext, useState } from "react";
import "./ProductForm.scss";
import { ProductContext } from "../../../App";
import axios from "axios";

function ProductForm(props) {
	const close = props.close;
	const [, , getProducts] = useContext(ProductContext);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [picture, setPicture] = useState(null);

	const handleName = (e) => {
		setName(e.target.value);
	};
	const handlePrice = (e) => {
		setPrice(e.target.value);
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
	};
	const handleQuantity = (e) => {
		setQuantity(e.target.value);
	};
	const handleFileUpload = (event) => {
		// get the selected file from the input
		const file = event.target.files[0];
		// create a new FormData object and append the file to it
		// const formData = new FormData();
		// setPicture(formData.append("file", file));
		setPicture(file);
	};

	const create = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("picture", picture);
		formData.append("name", name);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("quantity", quantity);
		// console.log(picture);
		axios
			.post(`${process.env.REACT_APP_BACK_URL}/Products/create`, formData)
			.then(() => {
				getProducts();
				close();
			})
			.catch((err) => {
				console.error(err.response);
			});
	};
	return (
		<form id="productsform_container" onSubmit={create}>
			<input onChange={handleName} type="text" placeholder="Name" />
			<input onChange={handlePrice} type="number" min={0} placeholder="Price" />
			<input
				onChange={handleDescription}
				type="text"
				placeholder="Description"
			/>
			<input onChange={handleQuantity} type="number" placeholder="Quantity" />
			<input type="file" onChange={handleFileUpload} />
			<button type="submit">Submit</button>
		</form>
	);
}

export default ProductForm;
