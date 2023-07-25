<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const token = getContext<Writable<string>>('token');

	function logout() {
		token.set('');
	}
</script>

<h1>Logout</h1>

<button on:click={logout}>Logout</button>
