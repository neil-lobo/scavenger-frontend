<script lang="ts">
	import { browser } from "$app/environment";
	import type { User } from "$lib/types";
	import type { LayoutData } from "./$types";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import Cookies from "js-cookie";

	export let data: LayoutData;
	const tokenStore = writable<string>();
	setContext("token", tokenStore);
	let user: User | undefined;

	tokenStore.subscribe((jwt) => {
		if (jwt === "") {
			user = undefined;
			if (browser) {
				Cookies.remove("token");
			}
		}

		if (jwt) {
			user = jwtDecodeUser(jwt);
			if (browser) {
				Cookies.set("token", jwt);
			}
		}
	});

	$: {
		if (data.token) {
			tokenStore.set(data.token);
		}
	}

	function jwtDecodeUser(jwt: string) {
		let { id, email, firstName, lastName, confirmedEmail }: User = JSON.parse(
			window.atob(jwt.split(".")[1])
		);

		let user: User = {
			id,
			email,
			firstName,
			lastName,
			confirmedEmail
		};
		return user;
	}
</script>

<nav>
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<a href="/signup">Signup</a>
	<a href="/logout">Logout</a>
	{JSON.stringify(user) ?? "no token"}
</nav>

<slot />
