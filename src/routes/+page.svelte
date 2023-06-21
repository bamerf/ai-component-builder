<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { writable } from 'svelte/store';
	import clsx from 'clsx';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import github from 'svelte-highlight/styles/github-dark';
	import '../app.css';

	import Button from '../components/Button.svelte';
	import Control from '../components/Control.svelte';

	let paddingX = writable(14);
	let paddingY = writable(8);
	let backgroundColor = writable('#52525b');
	let textColor = writable('#FFFFFF');

	const { messages, handleSubmit, isLoading } = useChat({
		api: '/server',
		initialInput: `
			write me a functional button in React with the details:
			
			- paddingX: ${$paddingX}
			- paddingY: ${$paddingY}
			- backgroundColor: ${$backgroundColor}
			- textColor: ${$textColor}

			write it using typescript
			style it with tailwindcss
		`
	});

	const bgStyles = 'bg-neutral-900 border border-neutral-400 rounded-md';
</script>

<svelte:head>
	{@html github}
</svelte:head>

<main class="flex gap-4 p-4">
	<div class={clsx('min-h-[1000px] min-w-[300px] p-4 flex flex-col gap-6', bgStyles)}>
		<Control label="Padding Horizontal">
			<div class="flex gap-2">
				<input class="w-full" type="range" min={2} max={48} step={1} bind:value={$paddingX} />
				<p class="text-white">{$paddingX}</p>
			</div>
		</Control>

		<Control label="Padding Horizontal">
			<div class="flex gap-2">
				<input class="w-full" type="range" min={2} max={48} step={1} bind:value={$paddingY} />
				<p class="text-white">{$paddingY}</p>
			</div>
		</Control>

		<Control label="Background Color">
			<input class="w-full bg-neutral-900" type="color" bind:value={$backgroundColor} />
		</Control>

		<Control label="Text Color">
			<input class="w-full bg-neutral-900" type="color" bind:value={$textColor} />
		</Control>

		<button class="w-full p-2 text-white rounded bg-neutral-600" on:click={handleSubmit}
			>{$isLoading ? 'Loading...' : 'Generate'}</button
		>
	</div>

	<div class="grid w-full gap-4">
		<div class={clsx('min-h-[300px] w-full flex justify-center items-center', bgStyles)}>
			<Button {paddingX} {paddingY} {backgroundColor} {textColor} />
		</div>
		<div class={clsx('min-h-[1000px] w-full', bgStyles)}>
			{#each $messages as message, index (message.id)}
				{#if index !== 0}
					<div class="p-4">
						<Highlight language={typescript} code={message.content} let:highlighted>
							<LineNumbers {highlighted} wrapLines hideBorder --padding-left={0} />
						</Highlight>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.neutral.950);
	}
</style>
