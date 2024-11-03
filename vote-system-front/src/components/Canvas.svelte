<script lang="ts">
	type CanvasProps = {
		size: number;
		color: string;
		clearCanvas: boolean;
	};

	let { color, size, clearCanvas }: CanvasProps = $props();
	let canvas: HTMLCanvasElement | undefined = $state();
	let ctx: CanvasRenderingContext2D | undefined = $state();
	let coords = $state({ x: 0, y: 0 });

	let cc = $derived(clearCanvas);
	$effect(() => {
		ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

		function resize() {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});

	$effect(() => {
		if (cc) {
			ctx?.clearRect(0, 0, canvas?.width as number, canvas?.height as number);
			console.log('non mim');
			clearCanvas = false;
		}
	});
</script>

<canvas
	bind:this={canvas}
	width="800"
	height="600"
	class="border border-black"
	onpointerdown={(e) => {
		if (!ctx) return;
		coords = { x: e.offsetX, y: e.offsetY };
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(coords.x, coords.y, size / 2, 0, 2 * Math.PI);
		ctx.fill();
	}}
	onpointerleave={() => {
		coords = { x: 0, y: 0 };
	}}
	onpointermove={(e) => {
		if (!ctx) return;
		const previous = coords;
		coords = { x: e.offsetX, y: e.offsetY };
		if (e.buttons === 1) {
			e.preventDefault();
			ctx.strokeStyle = color;
			ctx.lineWidth = size;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(previous.x, previous.y);
			ctx.lineTo(coords.x, coords.y);
			ctx.stroke();
		}
	}}
></canvas>
<div
	class="w-4 h-4 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
	style:top={coords.y + 'px'}
	style:left={coords.x + 'px'}
	style:background-color={color}
></div>
