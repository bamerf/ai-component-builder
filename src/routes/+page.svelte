<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { writable, derived } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import clsx from 'clsx';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import github from 'svelte-highlight/styles/github-dark';

	import '../app.css';

	import ResetIcon from '../components/ResetIcon.svelte';
	import Button from '../components/Button.svelte';
	import Control from '../components/Control.svelte';
	import Toggle from '../components/Toggle.svelte';

	let originalValues = {
		paddingX: 14,
		paddingY: 8,
		backgroundColor: '#52525b',
		textColor: '#FFFFFF',
		borderRadius: 4,
		text: 'Button',
		isBold: false
	};

	let paddingX = writable(originalValues.paddingX);
	let paddingY = writable(originalValues.paddingY);
	let backgroundColor = writable(originalValues.backgroundColor);
	let textColor = writable(originalValues.textColor);
	let borderRadius = writable(originalValues.borderRadius);
	let text = writable(originalValues.text);
	let isBold = writable(originalValues.isBold);

	let combinedValues = derived(
		[paddingX, paddingY, backgroundColor, textColor, borderRadius, text, isBold],
		([$paddingX, $paddingY, $backgroundColor, $textColor, $borderRadius, $text, $isBold]) => {
			return {
				paddingX: $paddingX,
				paddingY: $paddingY,
				backgroundColor: $backgroundColor,
				textColor: $textColor,
				borderRadius: $borderRadius,
				text: $text,
				fontWeight: $isBold ? '600' : '400'
			};
		}
	);

	const { messages, handleSubmit, isLoading } = useChat({
		api: '/server',
		initialInput: `
			write me a functional button in React.

			write it using typescript.
			style it with tailwindcss.

			it takes no props, and has the following styles:
			
		- paddingX: ${combinedValues.subscribe((val) => val.paddingX)}
    - paddingY: ${combinedValues.subscribe((val) => val.paddingY)}
    - backgroundColor: ${combinedValues.subscribe((val) => val.backgroundColor)}
    - textColor: ${combinedValues.subscribe((val) => val.textColor)}
    - borderRadius: ${combinedValues.subscribe((val) => val.borderRadius)}
    - button text: ${combinedValues.subscribe((val) => val.text)}
    - font-weight: ${combinedValues.subscribe((val) => val.fontWeight)}
		`
	});

	const bgStyles = 'bg-neutral-900 border border-neutral-400 rounded-md';

	function resetInput<T>(target: Writable<T>, key: keyof typeof originalValues) {
		if (key in originalValues) {
			target.update((value) => originalValues[key] as T);
		}
	}
</script>

<svelte:head>
	{@html github}
</svelte:head>

<main class="flex gap-4 p-4">
	<div class={clsx('min-h-[1000px] min-w-[300px] p-4 flex flex-col gap-6', bgStyles)}>
		<Control label="Padding Horizontal">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(paddingX, 'paddingX')} />
				<input
					class="flex-grow w-full"
					type="range"
					min={2}
					max={48}
					step={1}
					bind:value={$paddingX}
				/>
				<p class="text-white">{$paddingX}</p>
			</div>
		</Control>

		<Control label="Padding Vertical">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(paddingY, 'paddingY')} />
				<input class="w-full" type="range" min={2} max={48} step={1} bind:value={$paddingY} />
				<p class="text-white">{$paddingY}</p>
			</div>
		</Control>

		<Control label="Border Radius">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(borderRadius, 'borderRadius')} />
				<input class="w-full" type="range" min={0} max={50} step={1} bind:value={$borderRadius} />
				<p class="text-white">{$borderRadius}</p>
			</div>
		</Control>

		<Control label="Button Text">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(text, 'text')} />
				<input class="w-full" type="text" bind:value={$text} placeholder="Button" />
			</div>
		</Control>

		<Control label="Background Color">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(backgroundColor, 'backgroundColor')} />
				<input class="w-full bg-neutral-900" type="color" bind:value={$backgroundColor} />
			</div>
		</Control>

		<Control label="Text Color">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(textColor, 'textColor')} />
				<input class="w-full bg-neutral-900" type="color" bind:value={$textColor} />
			</div>
		</Control>

		<Control label="Bold">
			<Toggle isChecked={$isBold} setIsChecked={() => ($isBold = !$isBold)} />
		</Control>

		<button class="w-full p-2 text-white rounded bg-neutral-600" on:click={handleSubmit}
			>{$isLoading ? 'Loading...' : 'Generate'}</button
		>
	</div>

	<div class="grid w-full gap-4">
		<div class={clsx('min-h-[300px] w-full flex justify-center items-center', bgStyles)}>
			<Button {paddingX} {paddingY} {backgroundColor} {textColor} {borderRadius} {text} {isBold} />
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
