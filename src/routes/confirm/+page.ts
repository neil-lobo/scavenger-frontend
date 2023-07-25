import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
	return {
		searchParams: url.searchParams
	};
}) satisfies PageLoad;
