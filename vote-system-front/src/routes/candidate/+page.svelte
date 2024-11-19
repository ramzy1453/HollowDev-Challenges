<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import Navbar from '$components/Navbar.svelte';

	import { auth } from '$lib/index.svelte';
	import { candidate } from '$lib/api';
	import type { Selected } from 'bits-ui';

	let skills = $state('');
	let vision = $state('');
	let candidatureFor: Selected<string> = $state({
		value: '',
		label: ''
	});
	let motivation = $state('');

	const posts = [
		{ value: 'P', label: 'President' },
		{ value: 'VP', label: 'Vice President' },
		{ value: 'SG', label: 'General Secretary' },
		{ value: 'SGA', label: 'Joint General Secretary' }
	];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const candidateData = {
			skills: skills.split(','),
			vision,
			candidatureFor: candidatureFor.value,
			motivation
		};

		console.log('Candidate data:', candidateData);

		const { data, message, success } = await candidate(auth.accessToken, candidateData);

		alert(message);
	}
</script>

<Navbar />
<a href="/vote">vote</a>
<div class="py-8">
	<form onsubmit={handleSubmit} class="mx-auto max-w-3xl space-y-6">
		<div class="space-y-2">
			<Label for="skills">Skills</Label>
			<Input
				id="candidatureFor"
				bind:value={skills}
				placeholder="Enter your skill separated by comma"
			/>
		</div>

		<div class="space-y-2">
			<Label for="vision">Vision</Label>
			<Textarea id="vision" bind:value={vision} placeholder="Describe your vision" rows={4} />
		</div>

		<div class="space-y-2">
			<Label>Candidature For</Label>
			<Select.Root
				selected={candidatureFor}
				onSelectedChange={(selected) => {
					selected && (candidatureFor = selected);
				}}
			>
				<Select.Trigger>
					<Select.Value placeholder="Select a post" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each posts as post}
							<Select.Item value={post.value} label={post.label}>{post.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="candidatureFor" />
			</Select.Root>
		</div>

		<div class="space-y-2">
			<Label for="motivation">Motivation</Label>
			<Textarea
				id="motivation"
				bind:value={motivation}
				placeholder="What motivates you to apply for this position?"
				rows={4}
			/>
		</div>

		<Button type="submit" class="w-full">Submit Application</Button>
	</form>
</div>
