<script lang="ts">
    type ButtonProps =  {
		isPrimary?: boolean;
		text: string;
        onButtonClick : () => void;
	};
	let { isPrimary, text, onButtonClick }:ButtonProps = $props();
</script>

<button
	class="transform rounded-full px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
	class:bg-white-500={!isPrimary}
	class:bg-blue-500={isPrimary}
	class:text-blue-500={!isPrimary}
	class:text-white={isPrimary}
	class:border-blue-500={!isPrimary}
	class:border-1={!isPrimary}
    onclick={onButtonClick}
>
	{text}
</button>
