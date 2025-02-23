import { type Product } from "../types/product";
import axios, { AxiosError } from "axios";

export const fetchProducts = async (): Promise<Product[]> => {
	return axios
		.get("http://localhost:8080/products")
		.then((res) => {
			return res.data;
		})
		.catch((err: AxiosError) => {
			console.log(err);
			return [];
		});
};
