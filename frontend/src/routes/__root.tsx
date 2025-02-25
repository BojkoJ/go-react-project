import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to='/'>Back to home</Link>
			</div>
		);
	},
});

function RootComponent() {
	return (
		<>
			<div className='p-2 flex gap-2 text-lg'>
				<Link
					to='/'
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>{" "}
				<Link
					to='/products'
					activeProps={{
						className: "font-bold",
					}}
				>
					Products
				</Link>
			</div>
			<hr />
			<Outlet />
			<ReactQueryDevtools buttonPosition='top-right' />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	);
}
