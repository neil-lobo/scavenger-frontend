<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const loginUrl = new URL("login", PUBLIC_API_URL);

	let email = "";
	let password = "";
	const token = getContext<Writable<string>>("token");

	async function attemptLogin() {
		if (email === "" || password === "") return;

		const res = await fetch(loginUrl, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		if (res.status === 200) {
			const json = await res.json();
			token.set(json.token);
		} else {
			console.log(res.status);
		}
	}
</script>

<h1>Login</h1>

<div class="input-container">
	<label for="email">Email:</label>
	<input type="text" name="email" id="email" bind:value={email} />
</div>
<div class="input-container">
	<label for="password">Password:</label>
	<input type="password" name="password" id="password" bind:value={password} />
</div>
<div class="input-container">
	<button on:click={attemptLogin}>Login</button>
</div>
