import axios, { AxiosError } from "axios";
import { Product } from "../../types/product";

export const getProduct = async (productId: string): Promise<Product> => {
	return axios
		.get(`http://localhost:8080/products/${productId}`)
		.then((res) => {
			return res.data;
		})
		.catch((err: AxiosError) => {
			console.log(err);
			return;
		});
};

export class ProductNotFoundError extends Error {}
