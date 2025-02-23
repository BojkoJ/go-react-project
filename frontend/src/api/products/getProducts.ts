import axios, { AxiosError } from "axios";
import { Product } from "../../types/product";

export const getProducts = async (): Promise<Product[]> => {
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
