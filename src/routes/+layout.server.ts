import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	return {
		token: cookies.get('token')
	};
}) satisfies LayoutServerLoad;
