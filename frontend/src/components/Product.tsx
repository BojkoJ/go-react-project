import { type Product } from "../types/product";

const Product = ({product}: {product: Product}) => {
    return (
        <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.category.name}</p>
            <p>{product.description}</p>
        </div>
    )
}

export default Product;