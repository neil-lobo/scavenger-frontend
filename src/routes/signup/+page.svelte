<script lang="ts">
	import { goto } from "$app/navigation";
	import { PUBLIC_API_URL } from "$env/static/public";

	const signupUrl = new URL("signup", PUBLIC_API_URL);

	let firstName = "";
	let lastName = "";
	let email = "";
	let password = "";
	let confirmPassword = "";

	async function signUp() {
		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			password === "" ||
			confirmPassword === ""
		)
			return;
		if (password !== confirmPassword) return;

		const res = await fetch(signupUrl, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				email,
				password,
				name: {
					first: firstName,
					last: lastName,
					abbrevLast: true
				}
			})
		});

		if (res.status === 200) {
			goto("/");
		} else {
			console.log(res.status);
			console.log(await res.json());
		}
	}
</script>

<h1>Sign up</h1>

<div class="input-container">
	<label for="first-name">First Name:</label>
	<input type="text" name="first-name" id="first-name" bind:value={firstName} />
</div>
<div class="input-container">
	<label for="last-name">Last Name:</label>
	<input type="text" name="last-name" id="last-name" bind:value={lastName} />
</div>
<div class="input-container">
	<label for="email">Email:</label>
	<input type="text" name="email" id="email" bind:value={email} />
</div>
<div class="input-container">
	<label for="password">Password:</label>
	<input type="password" name="password" id="password" bind:value={password} />
</div>
<div class="input-container">
	<label for="confirm-password">Confirm Password:</label>
	<input
		type="password"
		name="confirm-password"
		id="confirm-password"
		bind:value={confirmPassword}
	/>
</div>
<div class="input-container">
	<button on:click={signUp}>Sign up</button>
</div>
