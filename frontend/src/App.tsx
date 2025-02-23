import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "./api/utils"

function App() {

  const { data } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })

  return (
    <>
      {data?.map((product) => (
        <div key={product.id}>
        <p>{product.name}</p>
        <p>{product.category.name}</p>
        <p>{product.description}</p>
        </div>
      ))}
    </>
  )
}

export default App
