<script lang="ts">
	import { auth, clearLocalStorage } from '$lib/index.svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	function logout() {
		clearLocalStorage();
		goto('/login');
	}
</script>

<div class="flex h-16 items-center justify-between border px-8">
	<p>{auth.user?.firstName} {auth.user?.lastName}</p>
	<div class="flex items-center justify-center space-x-4">
		<ul class="flex space-x-2">
			{#if auth.user?.role === 'admin'}
				<li class="border">
					<a href="/admin">Admin</a>
				</li>
			{/if}
			{#if auth.accessToken}
				<li class="border">
					<a href="/vote">Vote</a>
				</li>
				<li class="border">
					<a href="/candidate">Candidate</a>
				</li>
			{/if}
		</ul>
		<Button onclick={logout} variant="outline">Logout</Button>
	</div>
</div>
