<script lang="ts">
	import { browser } from "$app/environment";
	import type { User } from "$lib/types";
	import type { LayoutData } from "./$types";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import Cookies from "js-cookie";
	import Particles from "svelte-particles";
	import { loadSlim } from "tsparticles-slim";

	export let data: LayoutData;
	const tokenStore = writable<string>();
	setContext("token", tokenStore);
	let user: User | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const particlesConfig: any = {
		particles: {
			color: {
				value: "#fdc056"
			},
			links: {
				enable: false
			},
			move: {
				enable: true,
				speed: 0.25,
				direction: "top-right"
			},
			number: {
				value: 100
			},
			size: {
				value: {
					max: 3,
					min: 1
				},
				animation: {
					enable: true,
					speed: 1
				}
			},
			opacity: {
				value: {
					max: 1,
					min: 0.5
				},
				animation: {
					enable: true,
					speed: 0.25
				}
			}
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const particlesInit = async (engine: any) => {
		await loadSlim(engine);
	};

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

<Particles id="tsparticles" class="tsparticles" options={particlesConfig} {particlesInit} />
<div id="nav">
	<nav>
		<a href="/">Home</a>
		<a href="/login">Login</a>
		<a href="/signup">Signup</a>
		<a href="/logout">Logout</a>
		{JSON.stringify(user) ?? "no token"}
	</nav>
</div>

<div id="slot">
	<slot />
</div>

<style scoped>
	#slot,
	#nav {
		position: relative;
		z-index: 1;
	}

	#nav {
		background-color: #61002f;
	}
</style>
