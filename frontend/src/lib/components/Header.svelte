<script lang="ts">
	import { PUBLIC_APPLICATION_NAME } from '$env/static/public'
	import LinkButton from '$lib/components/Buttons/LinkButton.svelte'

	let { user } = $props();
</script>

<header class="sticky left-0 right-0 top-0 z-50 bg-white shadow-md">
	<div class="container mx-auto flex items-center justify-between px-4 py-3">
		<div class="flex items-center">
			<a href="/" class="group flex items-center">
				<div class="relative">
					<svg
						class="text-gray-800' h-10 w-10 transition-colors duration-300"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							class="transform transition-all duration-300 group-hover:scale-y-105"
							d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
						/>
						<circle
							class="transform transition-all duration-300 group-hover:scale-110"
							cx="12"
							cy="13"
							r="4"
						/>
						<circle
							class="opacity-0 transition-all duration-300 group-hover:opacity-100"
							cx="12"
							cy="13"
							r="2"
						/>
					</svg>
					<div
						class="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100"
					></div>
				</div>
				<div class="ml-2 flex flex-col">
					<span
						class="text-2xl font-bold tracking-tight text-gray-800 transition-colors duration-300"
					>
						{PUBLIC_APPLICATION_NAME}
					</span>
					<span
						class="text-xs font-medium text-gray-800 transition-colors"
					>
						Share Your Vision
					</span>
				</div>
			</a>
		</div>

		<!-- Navigation Links -->
		<nav class="hidden items-center space-x-6 md:flex">
			<a href="/explore" class="hover:text-blue-500"> Explore </a>
			<a href="/trending" class="hover:text-blue-500"> Trending </a>
			<a href="/collections" class="hover:text-blue-500"> Collections </a>
		</nav>

		<!-- User Section -->
		<div class="flex items-center space-x-4">
			{#if user}
				<button
					class="rounded-full p-1 transition-colors duration-300 hover:bg-gray-100"
					aria-label="Notifications"
				>
				</button>
				<div class="group relative">
					<button class="flex items-center space-x-1" aria-label="User Profile">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							/>
						</svg>
					</button>
				</div>
			{:else}
				<LinkButton isPrimary={true} href="/authentication/login">
					Login
				</LinkButton>
				<LinkButton isPrimary={false} href="/authentication/register">
					Signup
				</LinkButton>
			{/if}
		</div>
	</div>
</header>

<style>
	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.8;
		}
		100% {
			transform: scale(1);
			opacity: 0.5;
		}
	}

	.animate-pulse {
		animation: pulse 2s infinite;
	}

	/* Add backdrop blur support for Safari */
	@supports (-webkit-backdrop-filter: none) {
		header {
			-webkit-backdrop-filter: blur(8px);
			backdrop-filter: blur(8px);
		}
	}
</style>
