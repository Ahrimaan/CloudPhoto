<script lang="ts">
	import type { Snippet } from "svelte";

    type ButtonProps =  {
		isPrimary: boolean;
		onButtonClick?: () => void;
		children?: Snippet;
		class?:string
	};
	let { isPrimary = false, onButtonClick = $bindable(), children, class:klass }:ButtonProps = $props();
</script>

<button
	class="{klass} transform rounded-full px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
	class:bg-white-500={!isPrimary}
	class:bg-blue-500={isPrimary}
	class:text-blue-500={!isPrimary}
	class:text-white={isPrimary}
	class:border-blue-500={!isPrimary}
	class:border-1={!isPrimary}
	onclick={onButtonClick}
>
	{@render children?.()}
</button>
