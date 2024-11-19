<script>
	import { auth } from '$lib/index.svelte';
	let { children } = $props();
</script>

{#if auth?.user?.role === 'admin'}
	{@render children()}
{:else}
	<p>Not Admin</p>
{/if}
