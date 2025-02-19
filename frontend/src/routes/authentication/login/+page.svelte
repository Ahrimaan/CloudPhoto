<script lang="ts">
	import Button from '$lib/components/Buttons/Button.svelte';
	import Google from '$lib/icons/google.svelte';
	import Instagram from '$lib/icons/instagram.svelte';
	import Facebook from '$lib/icons/facebook.svelte';
	import Amazon from '$lib/icons/amazon.svelte';
    //TODO: Globale Error Handling
	let { email, password } = $state({ email: '', password: '' });
</script>

<div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>
            <form class="mt-6" method="POST" action="?/login">
                <div>
                    <div class="block text-sm font-medium text-gray-700">Email</div>
                    <input name="email" bind:value={email} type="email" class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required>
                </div>
                <div class="mt-4">
                    <div class="block text-sm font-medium text-gray-700">Password</div>
                    <input name="password" bind:value={password} type="password" class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" required>
                </div>
				<Button class={"w-full mt-4 px-4 py-2"} isPrimary={true}>Login</Button>
            </form>
            <div class="mt-6 text-center">
                <p class="text-gray-600">Or login with</p>
                <div class="grid grid-cols-2 gap-2 mt-3">
					<Button class={"flex items-center justify-center p-2"} isPrimary={false} onButtonClick={console.log}><Google />Google</Button>
                    <Button class={"flex items-center justify-center p-2"} isPrimary={false} onButtonClick={console.log}><Facebook />Facebook</Button>
					<Button class={"flex items-center justify-center p-2"} isPrimary={false} onButtonClick={console.log}><Instagram />Instagram</Button>
					<Button class={"flex items-center justify-center p-2"} isPrimary={false} onButtonClick={console.log}><Amazon />Amazon</Button>
                </div>
            </div>
        </div>
    </div>
</div>
