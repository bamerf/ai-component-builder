<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		import('tailwindcss/tailwind.css');
	});
	import clsx from 'clsx';
	import '../app.css';
	import { useChat } from 'ai/svelte';

	const { messages, handleSubmit, input } = useChat({
		api: '/server'
	});

	const bgStyles = 'bg-stone-800 border border-stone-400 rounded-md';
</script>

<main class="flex gap-4 p-4">
	<div class={clsx('min-h-[1000px] min-w-[300px]', bgStyles)} />
	<div class="grid gap-4 w-full">
		<div class={clsx('min-h-[300px] w-full flex justify-center items-center', bgStyles)}>
			<button
				class={clsx(
					'px-[14px] py-2 rounded font-semibold',
					'dark:bg-zinc-400 bg-zinc-900',
					'hover:bg-zinc-800 dark:hover:bg-zinc-500',
					'focus:outline-none dark:focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900'
				)}>Button</button
			>
		</div>
		<div class={clsx('min-h-[1000px] w-full', bgStyles)} />
	</div>
</main>

<form class="flex justify-center items-center" on:submit={handleSubmit} method="post">
	<input bind:value={$input} type="text" />
	<button type="submit">Generate</button>
</form>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.red.500);
	}
</style>
