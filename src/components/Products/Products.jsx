import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from "react";
import { ProductContext } from "../../App";
import ProductForm from "./ProductForm/ProductForm";
import ProductView from "./ProductView/ProductView";
import "./Products.scss";

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

function Products() {
	const [products] = useContext(ProductContext);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div id="products_container">
			<h2>Products</h2>
			<button onClick={handleOpen}>Create Product</button>
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
						<h1>Create Product</h1>
						<ProductForm close={handleClose} />
					</Box>
				</Fade>
			</Modal>
			<div id="table_container">
				<table id="products_table">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Picture</th>
						<th>Edit</th>
					</tr>
					{products.map((product, index) => {
						return <ProductView key={index} data={product} />;
					})}
				</table>
			</div>
		</div>
	);
}

export default Products;
