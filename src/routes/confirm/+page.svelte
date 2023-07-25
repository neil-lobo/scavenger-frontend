<script lang="ts">
	import { goto } from "$app/navigation";
	import { PUBLIC_API_URL } from "$env/static/public";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	const confirmUrl = new URL("confirm", PUBLIC_API_URL);

	export let data: PageData;
	let code = "";

	async function confirmEmail() {
		if (code === "") return;

		const res = await fetch(confirmUrl, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				code
			})
		});

		if (res.status === 200) {
			goto("/login");
		} else {
			code = "";
			console.log(res.status);
			console.log(await res.json());
		}
	}

	onMount(() => {
		const paramCode = data.searchParams.get("code");
		if (paramCode) {
			code = paramCode;
			confirmEmail();
		}
	});
</script>

<h1>Confim</h1>

<div class="input-container">
	<label for="code">Code:</label>
	<input type="text" name="code" id="code" bind:value={code} />
</div>
<div class="input-container">
	<button on:click={confirmEmail}>Login</button>
</div>
