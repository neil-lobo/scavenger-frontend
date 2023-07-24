<script lang="ts">
	import type { User } from '$lib/types';
	import type { LayoutData } from './$types';
	let user: User;

	export let data: LayoutData;
	if (data.token) {
		user = jwtDecodeUser(data.token);
	}

	function jwtDecodeUser(jwt: string) {
		let payload: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			[key: string]: any;
		} = JSON.parse(window.atob(jwt.split('.')[1]));

		let user: User = {
			id: payload.ID,
			email: payload.EMAIL,
			firstName: payload.F_NAME,
			lastName: payload.L_NAME,
			emailConfirmed: payload.EMAIL_CONFIRMED === 1 ? true : false
		};
		return user;
	}
</script>

<nav>
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<!-- <a href="/signup">Signup</a>
    <a href="/logout">Logout</a> -->
	{JSON.stringify(user) ?? 'no token'}
</nav>

<slot />
