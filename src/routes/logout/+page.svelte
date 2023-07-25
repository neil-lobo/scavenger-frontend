<script lang="ts">
	import { goto } from "$app/navigation";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const token = getContext<Writable<string>>("token");

	function logout() {
		token.set("");
		goto("/");
	}
</script>

<h1>Logout</h1>

<button on:click={logout}>Logout</button>
