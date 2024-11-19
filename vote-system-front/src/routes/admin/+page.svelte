<script lang="ts">
	import { acceptCandidature, rejectCandidature, getCandidates, getVotesCount } from '$lib/api';
	import Navbar from '$components/Navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { ICandidateResponse } from '../../types/candidate';
	import { auth } from '$lib/index.svelte';

	// Liste réactive des candidats
	let candidates: ICandidateResponse[] = $state.raw([]);

	// Charger les données au montage
	$effect(() => {
		(async () => {
			const { success, data, message } = await getCandidates(auth.accessToken as string);
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
</script>

<Navbar />

<div class="mt-6 grid grid-cols-2 gap-2">
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
				<p>Loading...</p>
			{:then count}
				<p>{count}</p>
			{:catch error}
				<p>{'error.message'}</p>
			{/await}

			<Button on:click={() => handleAccept(candidate.id)}>Accept</Button>
			<Button on:click={() => handleReject(candidate.id)}>Reject</Button>
		</div>
	{/each}
</div>
