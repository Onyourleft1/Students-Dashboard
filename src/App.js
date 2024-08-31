import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./components/Products/Products";
import Users from "./components/Users/Users";
import Front from "./components/Front/Front";

export const ProductContext = React.createContext();
export const UserContext = React.createContext();

function App() {
	const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);

	const getProducts = () => {
		axios
			.get(`${process.env.REACT_APP_BACK_URL}/Products/get`)
			.then((response) => {
				setProducts(response.data);
			});
	};
	const getUsers = () => {
		axios
			.get(`${process.env.REACT_APP_BACK_URL}/Users/get`)
			.then((response) => {
				setUsers(response.data);
			});
	};

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACK_URL}/Products/get`)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
		axios
			.get(`${process.env.REACT_APP_BACK_URL}/Users/get`)
			.then((response) => {
				setUsers(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
	}, []);

	return (
		<div className="App">
			<UserContext.Provider value={[users, setUsers, getUsers]}>
				<ProductContext.Provider value={[products, setProducts, getProducts]}>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/products" element={<Products />} />
							<Route path="/users" element={<Users />} />
							<Route path="/front" element={<Front />} />
						</Routes>
					</BrowserRouter>
				</ProductContext.Provider>
			</UserContext.Provider>
		</div>
	);
}

export default App;
