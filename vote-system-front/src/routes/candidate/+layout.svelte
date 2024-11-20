<script>
	import { auth } from '$lib/index.svelte';
	let { children } = $props();
</script>

{#if auth?.user}
	{@render children()}
{:else}
	<p>Not Access</p>
{/if}
