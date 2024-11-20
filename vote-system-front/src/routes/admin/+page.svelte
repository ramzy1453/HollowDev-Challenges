<script lang="ts">
	import { acceptCandidature, rejectCandidature, getCandidates, getVotesCount } from '$lib/api';
	import Navbar from '$components/Navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { ICandidateResponse } from '../../types/candidate';
	import { auth } from '$lib/index.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';

	// Liste réactive des candidats
	let candidates: ICandidateResponse[] = $state.raw([]);
	let selectedPositions: string[] | undefined = $state.raw();

	// Charger les données au montage
	$effect(() => {
		(async () => {
			const { success, data, message } = await getCandidates(
				auth.accessToken as string,
				selectedPositions && selectedPositions.length > 0
					? '?candidatureFor=' + selectedPositions.join(',')
					: ''
			);
			if (success) {
				candidates = data;
			}
		})();
	});

	// Gérer l'acceptation
	const handleAccept = async (candidateId: string) => {
		const { success, message } = await acceptCandidature(auth.accessToken as string, candidateId);
		alert(message);
		if (success) {
			candidates = candidates.map((candidate) =>
				candidate.id === candidateId ? { ...candidate, status: 'accepted' } : candidate
			);
		}
	};

	// Gérer le rejet
	const handleReject = async (candidateId: string) => {
		const { success, message } = await rejectCandidature(auth.accessToken as string, candidateId);
		alert(message);
		if (success) {
			candidates = candidates.map((candidate) =>
				candidate.id === candidateId ? { ...candidate, status: 'rejected' } : candidate
			);
		}
	};

	const fetchVotesCount = async (candidateId: string) => {
		const { success, data, message } = await getVotesCount(auth.accessToken as string, candidateId);
		if (success) {
			return data;
		}
	};

	$inspect(selectedPositions);
</script>

<Navbar />

<div class="mx-auto max-w-7xl">
	<div class="mt-8 flex justify-end">
		<ToggleGroup.Root
			type="multiple"
			value={selectedPositions}
			onValueChange={(positions) => {
				selectedPositions = positions as string[];
			}}
		>
			{#each ['P', 'VP', 'SG', 'SGA'] as pos}
				<ToggleGroup.Item value={pos} variant="outline" aria-label={pos}>
					{pos}
				</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	</div>
	<div class="mt-6 grid grid-cols-3 gap-3">
		{#each candidates as candidate}
			<div class="rounded-lg border bg-background p-4">
				<p class="text-lg font-semibold">{candidate.user.firstName} {candidate.user.lastName}</p>
				<p class="text-sm">{candidate.skills.join(', ')}</p>
				<p class="text-sm">{candidate.vision}</p>
				<p class="text-sm">{candidate.motivation}</p>
				<p
					class="text-sm"
					style="color: {candidate.status === 'pending'
						? 'orange'
						: candidate.status === 'rejected'
							? 'red'
							: 'green'}"
				>
					{candidate.status}
				</p>
				<p class="text-sm">{candidate.candidatureFor}</p>
				{#await fetchVotesCount(candidate.id)}
					<p>0</p>
				{:then count}
					<p>{count || 0}</p>
				{:catch error}
					<p>{error.message}</p>
				{/await}

				<Button onclick={() => handleAccept(candidate.id)}>Accept</Button>
				<Button onclick={() => handleReject(candidate.id)}>Reject</Button>
			</div>
		{/each}
	</div>
</div>
