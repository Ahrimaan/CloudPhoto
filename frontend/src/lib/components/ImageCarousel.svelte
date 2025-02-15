<script lang="ts">
	import { onMount } from 'svelte';

	const getRandomNumbers = (): string[] => {
		if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
			throw new Error('Crypto API is not available');
		}
		const min = 10000;
		const max = 10000000;
		const count = 10;
		const range = max - min + 1;
		const randomValues = new Uint32Array(count);
		crypto.getRandomValues(randomValues);
		return Array.from(randomValues).map((value) => {
			let val = (value % range) + min;
			return `https://picsum.photos/seed/${val}/1280/800`;
		});
	};

	//TODO: GET RANDOM IMAGES FROM BACKEND
	const images: Array<string> = getRandomNumbers();

	let currentIndex = $state(0);

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prevImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	// Auto-advance carousel
	onMount(() => {
		const interval = setInterval(nextImage, 5000);
		return () => clearInterval(interval);
	});
</script>

<div class="relative h-[calc(100vh-4rem)] w-full">
	<div class="absolute inset-0">
		{#each images as image, i}
			<div
				class="absolute inset-0 transition-opacity duration-500"
				style="opacity: {i === currentIndex ? '1' : '0'}"
			>
				<img
					src={image}
					alt="Carousel of images coming from random users"
					class="h-full w-full object-cover"
				/>
			</div>
		{/each}
	</div>

	<button
		class="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-75"
		onclick={prevImage}
	>
		←
	</button>

	<button
		class="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-75"
		onclick={nextImage}
	>
		→
	</button>

	<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
		{#each images as _, i}
			<button
				class="h-3 w-3 rounded-full {i === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}"
				onclick={() => (currentIndex = i)}
				aria-label="Go to image {i + 1}"
			></button>
		{/each}
	</div>
</div>
