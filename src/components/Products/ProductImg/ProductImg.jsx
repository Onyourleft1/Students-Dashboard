import { Backdrop, Box, Fade, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";

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
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
};

function ProductImg(props) {
	const image = props.data;
	const fet = props.fet;
	const product_id = props.product_id;
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const deleteImage = () => {
		axios
			.delete(
				`${process.env.REACT_APP_BACK_URL}/ProductsGallery/delete/${image.id}`
			)
			.then(() => {
				fet(product_id);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<div
			style={{
				position: "relative",
			}}
		>
			<img
				width={100}
				height={100}
				src={`${process.env.REACT_APP_BACK_URL}/${image.path}`}
				alt=""
				onClick={handleOpen}
				style={{
					cursor: "pointer",
				}}
			/>
			<button
				onClick={deleteImage}
				style={{
					backgroundColor: "transparent",
					border: "none",
					padding: "0",
					cursor: "pointer",
					borderRadius: "50%",
					aspectRatio: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "25px",
					position: "absolute",
					color: "red",
					top: -10,
					right: -10,
				}}
			>
				<IoMdTrash />
			</button>
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
						<button
							onClick={handleClose}
							style={{
								backgroundColor: "transparent",
								border: "none",
								position: "absolute",
								top: 0,
								right: 0,
								margin: "1rem",
								cursor: "pointer",
							}}
						>
							X
						</button>
						<img
							src={`${process.env.REACT_APP_BACK_URL}/${image.path}`}
							alt="img"
							height={"100%"}
							style={{
								aspectRatio: "auto",
							}}
						/>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default ProductImg;
