<script lang="ts">
	import { goto } from '$app/navigation';
	import { register } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { auth, setInLocalStorage } from '$lib/index.svelte';
	import Icon from '@iconify/svelte';
	import Reload from 'svelte-radix/Reload.svelte';

	let isLoading = $state(true);
	$effect(() => {
		let timeout = setTimeout(() => {
			isLoading = false;
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	});

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	async function handleSubmit(e: Event) {
		console.log({ e });
		e.preventDefault();
		const { message, data, success } = await register({
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		});
		if (success) {
			auth.user = data.user;
			auth.accessToken = data.accessToken;
			setInLocalStorage('accessToken', auth.accessToken);
			setInLocalStorage('user', auth.user);
			goto('/candidate');
		}
		alert(message);
	}
</script>

<div class="flex h-screen border border-black">
	<div
		class="flex flex-1 flex-col justify-between bg-cover bg-no-repeat p-8"
		style:background-image="url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)"
	>
		<p class="text-xl font-medium">Acme Inc</p>
		<div class="space-y-2">
			<p class="text-xl">
				“This library has saved me countless hours of work and helped me deliver stunning designs to
				my clients faster than ever before. Highly recommended!”
			</p>
			<p class="text-md">Sofia Davis</p>
		</div>
	</div>
	<div
		class="flex flex-1 items-center justify-center border-l border-muted bg-background text-white"
	>
		<div class="flex max-w-md flex-1 flex-col items-center justify-center">
			<h1 class="mb-2 text-2xl font-semibold">Create an account</h1>
			<p class="text-sm">Enter your email below to create your account</p>
			<form class="mt-6 w-full space-y-2" onsubmit={handleSubmit}>
				<Input
					bind:value={firstName}
					placeholder="Enter your first name"
					type="text"
					class="placeholder:text-foreground-muted border-muted bg-transparent text-white"
				/>

				<Input
					bind:value={lastName}
					placeholder="Enter your last name"
					type="text"
					class="placeholder:text-foreground-muted border-muted bg-transparent text-white"
				/>

				<Input
					bind:value={email}
					placeholder="Enter your email"
					type="email"
					class="placeholder:text-foreground-muted border-muted bg-transparent text-white"
				/>

				<Input
					bind:value={password}
					placeholder="Enter your password"
					type="password"
					class="placeholder:text-foreground-muted border-muted bg-transparent text-white"
				/>

				<Input
					bind:value={confirmPassword}
					placeholder="Confirm your password"
					type="password"
					class="placeholder:text-foreground-muted border-muted bg-transparent text-white"
				/>

				<Button class="w-full" variant="default" type="submit">Sign Up</Button>
			</form>
			<div class="relative my-4 flex w-full items-center">
				<div class="flex-grow border-t border-muted"></div>
				<span class="mx-4 flex-shrink text-sm uppercase">Or continue with</span>
				<div class="flex-grow border-t border-muted"></div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading} class="w-full font-medium">
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<Icon icon="mdi:github" class="mr-2 h-4 w-4" />
				{/if}
				GitHub
			</Button>
			<p class="text-md mt-6 text-center text-muted-foreground">
				By clicking continue, you agree to our
				<a
					href="/"
					class="border-b border-muted-foreground hover:border-blue-500 hover:text-blue-500"
				>
					Terms of Service
				</a>
				and
				<a
					href="/"
					class="border-b border-muted-foreground hover:border-blue-500 hover:text-blue-500"
					>Privacy Policy</a
				>.
			</p>
		</div>
	</div>
</div>
