import { useEffect } from "react";
import {
	ErrorComponent,
	createFileRoute,
	useRouter,
} from "@tanstack/react-router";
import {
	useQueryErrorResetBoundary,
	useSuspenseQuery,
} from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	getProduct,
	ProductNotFoundError,
} from "../../api/products/getProduct";
import { queryOptions } from "@tanstack/react-query";

const productQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: ["products", { productId }],
		queryFn: () => getProduct(productId),
	});

export const Route = createFileRoute("/products/$productId")({
	loader: ({ context: { queryClient }, params: { productId } }) => {
		return queryClient.ensureQueryData(productQueryOptions(productId));
	},
	errorComponent: ProductErrorComponent,
	component: ProductComponent,
});

export function ProductErrorComponent({ error }: ErrorComponentProps) {
	const router = useRouter();
	const queryErrorResetBoundary = useQueryErrorResetBoundary();

	useEffect(() => {
		queryErrorResetBoundary.reset();
	}, [queryErrorResetBoundary]);

	if (error instanceof ProductNotFoundError) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			<button
				onClick={() => {
					router.invalidate();
				}}
			>
				retry
			</button>
			<ErrorComponent error={error} />
		</div>
	);
}

function ProductComponent() {
	const productId = Route.useParams().productId;
	const { data: product } = useSuspenseQuery(productQueryOptions(productId));

	return (
		<div className='space-y-2'>
			<h4 className='text-xl font-bold underline'>{product.name}</h4>
			<div className='text-sm'>{product.description}</div>
		</div>
	);
}
