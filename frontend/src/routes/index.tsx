import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className='p-2'>
			<h3>This is homepage!</h3>
		</div>
	);
}
