<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	function typewriter(node: HTMLElement, { speed }: { speed: number }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent as string;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text.length * t);
				console.log(i);
				node.textContent = text.slice(0, i);
			}
		};
	}

	const texts = [
		'The quick brown fox jumps over the lazy dog',
		'Pack my box with five dozen liquor jugs',
		'How razorback-jumping frogs can level six piqued gymnasts',
		'Sphinx of black quartz, judge my vow',
		'The five boxing wizards jump quickly'
	];

	let currentIdx = $state(0);
</script>

<button class="bg-red-400 p-2" onclick={() => (currentIdx = (currentIdx + 1) % texts.length)}
	>Next</button
>

<!-- animte -->

<ul>
	{#each texts as item (item)}
		<li animate:flip={{ duration: 300 }} class="item">
			{item}
		</li>
	{/each}
</ul>
