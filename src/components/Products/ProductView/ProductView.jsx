import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../App";
import "./ProductView.scss";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import ProductImg from "../ProductImg/ProductImg";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80vw",
	height: "80vh",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function ProductView(props) {
	const product = props.data;
	const [, , getProducts] = useContext(ProductContext);
	const [editable, setEditable] = useState(false);
	const [name, setName] = useState(props.data.name);
	const [price, setPrice] = useState(props.data.price);
	const [description, setDescription] = useState(props.data.description);
	const [quantity, setQuantity] = useState(props.data.quantity);
	const [image, setImage] = useState("");
	const [picture, setPicture] = useState(null);
	const [gallery, setGallery] = useState([]);
	const [adding, setAdding] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
	};
	const handlePrice = (e) => {
		setPrice(e.target.value);
	};
	const handleDecription = (e) => {
		setDescription(e.target.value);
	};
	const handleQuantity = (e) => {
		setQuantity(e.target.value);
	};
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		setPicture(file);
	};
	const save = () => {
		const formData = new FormData();

		formData.append("picture", picture);
		formData.append("id", product.id);
		formData.append("name", name);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("quantity", quantity);
		axios
			.patch(`${process.env.REACT_APP_BACK_URL}/Products/update`, formData)
			.then(() => {
				getProducts();
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
	const toggleAdding = () => {
		if (adding) {
			setAdding(false);
			save();
		}
		if (!adding) {
			setAdding(true);
		}
	};

	const del = (id) => {
		axios
			.delete(`${process.env.REACT_APP_BACK_URL}/Products/delete/${id}`)
			.then(() => {
				getProducts();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchGallery = (id) => {
		axios
			.get(`${process.env.REACT_APP_BACK_URL}/ProductsGallery/get/${id}`)
			.then((response) => {
				setGallery(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
	};
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_BACK_URL}/ProductsFiles/get/${product.id}`,
				{ responseType: "blob" }
			)
			.then((response) => {
				const imageUrl = URL.createObjectURL(response.data);
				setImage(imageUrl);
			})
			.catch((err) => {
				console.error(err.response);
			});

		fetchGallery(product.id);
	}, [product.id]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const addToGallery = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("product_id", product.id);
		for (let i = 0; i < e.target.files.length; i++) {
			formData.append("gallery", e.target.files[i]);
		}

		// formData.append("gallery", e.target.files);
		axios
			.post(
				`${process.env.REACT_APP_BACK_URL}/ProductsGallery/create`,
				formData
			)
			.then(() => {
				fetchGallery(product.id);
				setAdding(false);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<tr id="productView_container">
			<td> {product.id}</td>
			<td>{editable ? <input onChange={handleName} /> : product.name}</td>
			<td>{editable ? <input onChange={handlePrice} /> : product.price}</td>
			<td
				style={{
					maxWidth: 200,
					wordWrap: "break-word",
					height: "fit-content",
					whiteSpace: "normal",
				}}
			>
				{editable ? (
					<textarea rows={4} onChange={handleDecription} />
				) : (
					product.description
				)}
			</td>
			<td>
				{editable ? <input onChange={handleQuantity} /> : product.quantity}
			</td>
			<td>
				{/* <a href={image} download={"download.jpg"}>
					<button>Download</button>
				</a> */}
				{editable ? (
					<input type="file" onChange={handleFileUpload} />
				) : (
					<img id="product_img" src={image} alt="test" />
				)}
			</td>
			<td id="edit">
				<button onClick={toggle}>{editable ? "Save" : "Edit"}</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						del(product.id);
					}}
				>
					Delete
				</button>
				<button onClick={handleOpen}>Gallery</button>
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
							<h1>Gallery</h1>
							<div
								style={{
									marginBottom: "1rem",
								}}
							>
								{adding ? (
									<input type="file" multiple onChange={addToGallery} />
								) : (
									<button onClick={toggleAdding}>Add To Gallery</button>
								)}
							</div>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "1rem",
								}}
							>
								{gallery.map((pic, index) => {
									return (
										<ProductImg
											key={index}
											data={pic}
											product_id={product.id}
											fet={fetchGallery}
										/>
									);
								})}
							</div>
						</Box>
					</Fade>
				</Modal>
			</td>
		</tr>
	);
}

export default ProductView;
