import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products/getProducts";

const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => getProducts(),
});

export const Route = createFileRoute("/products/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(productsQueryOptions),
	component: ProductsComponent,
});

function ProductsComponent() {
	const { data: products } = useSuspenseQuery(productsQueryOptions);

	return (
		<div className='p-2 flex gap-2'>
			<ul className='list-disc pl-4'>
				{products.map((product) => {
					return (
						<li key={product.id} className='whitespace-nowrap'>
							<Link
								to='/products/$productId'
								params={{
									productId: product.id,
								}}
								className='block py-1 text-blue-600 hover:opacity-75'
								activeProps={{
									className: "font-bold underline",
								}}
							>
								<div>{product.name.substring(0, 20)}</div>
							</Link>
						</li>
					);
				})}
			</ul>
			<hr />
			<Outlet />
		</div>
	);
}
