import { type Category } from "./category";
import { type Variant } from "./variant";

export interface Product {
	id: string;
	name: string;
	description: string;
	category: Category;
	variants: Variant[];
}
