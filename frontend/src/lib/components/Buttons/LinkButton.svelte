<script lang="ts">
	import type { Snippet } from 'svelte';
	type LinkButtonProps = {
		isPrimary?: boolean;
		href: string;
		children?: Snippet
	};

	let { isPrimary, href, children }: LinkButtonProps = $props();
</script>

<a
	{href}
	class="transform rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
	class:bg-white-500={!isPrimary}
	class:bg-blue-500={isPrimary}
	class:text-blue-500={!isPrimary}
	class:text-white={isPrimary}
	class:border-blue-500={!isPrimary}
	class:border-1={!isPrimary}
	class:hover:text-white={!isPrimary}
>
	{@render children?.()}
</a>
