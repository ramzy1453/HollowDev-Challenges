<script lang="ts">
	import { getAcceptedCandidates, vote } from '$lib/api';
	import { auth } from '$lib/index.svelte';
	import { Button } from '$lib/components/ui/button';
	import Navbar from '$components/Navbar.svelte';

	const handleVote = (candidateId: string) => async () => {
		const { data, message, success } = await vote(auth.accessToken as string, candidateId);
		console.log({ message, success, data });
		alert(message);
	};
</script>

<Navbar />

<div>
	<h1 class="text-2xl font-semibold">Vote for your favorite candidate</h1>
	<p class="text-sm">Select your favorite candidate from the list below</p>
</div>

{#await getAcceptedCandidates(auth.accessToken as string)}
	<p>Loading...</p>
{:then candidates}
	<div class="mt-6 grid grid-cols-2 gap-2">
		{#each candidates.data as candidate}
			<div class="rounded-lg border bg-background p-4">
				<p class="text-lg font-semibold">{candidate.user.firstName} {candidate.user.lastName}</p>
				<p class="text-sm">{candidate.skills.join(', ')}</p>

				<p class="text-sm">{candidate.vision}</p>

				<p class="text-sm">{candidate.motivation}</p>

				<p class="text-sm">{candidate.candidatureFor}</p>

				<Button onclick={handleVote(candidate.id)}>Vote</Button>
			</div>
		{/each}
	</div>
{:catch error}
	<p class="text-destructive">{'error.message'}</p>
{/await}
