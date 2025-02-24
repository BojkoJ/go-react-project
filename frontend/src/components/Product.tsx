import { type Product } from "../types/product";

const Product = ({product}: {product: Product}) => {
    return (
        <div key={product.id}>
            <p>ID: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Category: {product.category.name}</p>
            <p>Desc: {product.description}</p>
        </div>
    )
}

export default Product;