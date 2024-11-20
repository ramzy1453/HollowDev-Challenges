<script lang="ts">
	import { getAcceptedCandidates, vote } from '$lib/api';
	import { auth } from '$lib/index.svelte';
	import { Button } from '$lib/components/ui/button';
	import Navbar from '$components/Navbar.svelte';

	const handleVote = (candidateId: string) => async () => {
		const { data, message, success } = await vote(auth.accessToken as string, candidateId);
		alert(message);
	};

	let selectedPositions: string[] | undefined = $state.raw();
</script>

<Navbar />

<div class="mx-auto max-w-7xl py-12">
	<div class="space-y-2">
		<h1 class="text-2xl font-semibold">Vote for your favorite candidate</h1>
		<p class="text-sm">Select your favorite candidate from the list below</p>
	</div>

	{#await getAcceptedCandidates(auth.accessToken as string, selectedPositions && selectedPositions.length > 0 ? '?candidatureFor=' + selectedPositions.join(',') : '')}
		<p class="my-2">Loading...</p>
	{:then candidates}
		<div class="mt-6 grid grid-cols-3 gap-2">
			{#each candidates.data as candidate}
				<div
					class="flex h-64 flex-col justify-between space-y-2 rounded-lg border bg-background p-4"
				>
					<div class="space-y-2">
						<p class="text-lg font-semibold">
							{candidate.user.firstName}
							{candidate.user.lastName}
						</p>
						<p class="text-sm">
							<span class="font-bold">Skills:</span>
							{candidate.skills.join(', ')}
						</p>

						<p class="text-sm">
							<span class="font-bold">Vision:</span>
							{candidate.vision}
						</p>

						<p class="text-sm">
							<span class="font-bold">Motivation:</span>
							{candidate.motivation}
						</p>

						<p class="text-sm">
							<span class="font-bold">Position:</span>
							{candidate.candidatureFor}
						</p>
					</div>

					<Button class="w-full" onclick={handleVote(candidate.id)}>Vote</Button>
				</div>
			{/each}
		</div>
	{:catch error}
		<p class="text-destructive">{error.message}</p>
	{/await}
</div>
