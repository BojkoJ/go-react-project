import { useQuery } from "@tanstack/react-query"
import { getProducts } from "./api/products/getProducts"
import Product from "./components/Product"

function App() {

  const { data } = useQuery({ queryKey: ['products'], queryFn: getProducts })

  return (
    <>
      {data?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </>
  )
}

export default App
